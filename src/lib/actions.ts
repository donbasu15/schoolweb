'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from './db';
import { User, Notification, Event, JobPosting, ComplianceDocument, ContactSubmission } from './models';
import { mockDb, INSPECTION_SECRET_TOKEN, MockNotification, MockEvent, MockJobPosting, MockComplianceDocument, MockContactSubmission } from './mockStore';
import { loginUser, loginInspector, logoutUser, logoutInspector } from './auth';
import { saveUpload } from './uploads';

// Helper to check MongoDB connection status
async function tryConnect() {
  try {
    await connectToDatabase();
    return true;
  } catch (error) {
    console.warn('MongoDB connection failed. Operating in mockDb fallback mode.');
    return false;
  }
}

// ----------------------------------------
// AUTHENTICATION ACTIONS
// ----------------------------------------
export async function authenticateAdmin(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'All fields are required' };
  }

  const isConnected = await tryConnect();

  if (isConnected) {
    try {
      const userDoc = await User.findOne({ email }).lean();
      if (userDoc) {
        const isMatch = await bcrypt.compare(password, userDoc.passwordHash as string);
        if (isMatch) {
          await loginUser({
            userId: userDoc._id.toString(),
            name: userDoc.name as string,
            email: userDoc.email as string,
            role: userDoc.role as 'admin' | 'staff',
          });
          return { success: true, role: userDoc.role };
        }
      }
    } catch (err) {
      console.error('Mongoose admin auth error, falling back:', err);
    }
  }

  // Fallback to mockDb
  const mockUser = mockDb.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (mockUser) {
    const isMatch = bcrypt.compareSync(password, mockUser.passwordHash);
    if (isMatch) {
      await loginUser({
        userId: mockUser._id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
      });
      return { success: true, role: mockUser.role };
    }
  }

  return { success: false, error: 'Invalid email or password' };
}

export async function authenticateInspector(prevState: any, formData: FormData) {
  const code = formData.get('code') as string;

  if (!code) {
    return { success: false, error: 'Verification code is required' };
  }

  if (code.trim() === INSPECTION_SECRET_TOKEN) {
    await loginInspector();
    return { success: true };
  }

  return { success: false, error: 'Invalid inspection authorization code' };
}

export async function logoutAction() {
  await logoutUser();
  await logoutInspector();
}

// ----------------------------------------
// CONTACT FORM ACTION
// ----------------------------------------
export async function submitContact(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const department = formData.get('department') as any;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !phone || !department || !subject || !message) {
    return { success: false, error: 'All fields are required' };
  }

  const isConnected = await tryConnect();

  if (isConnected) {
    try {
      await ContactSubmission.create({ name, email, phone, department, subject, message });
      return { success: true };
    } catch (err) {
      console.error('Mongoose contact submission failed, falling back:', err);
    }
  }

  // Fallback mockDb
  mockDb.contactSubmissions.push({
    _id: 'sub_' + Date.now(),
    name,
    email,
    phone,
    department,
    subject,
    message,
    status: 'unread',
    createdAt: new Date(),
  });

  return { success: true };
}

// ----------------------------------------
// CAREER JOB APPLICATION ACTION
// ----------------------------------------
export async function submitJobApplication(prevState: any, formData: FormData) {
  const jobId = formData.get('jobId') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const coverLetter = formData.get('coverLetter') as string;
  const resumeFile = formData.get('resume') as File;

  if (!jobId || !name || !email || !phone || !coverLetter || !resumeFile) {
    return { success: false, error: 'All fields are required' };
  }

  try {
    const resumeUrl = await saveUpload(resumeFile);

    // Save as inquiry in submission panel (or department inquiry)
    const isConnected = await tryConnect();
    const mockJob = mockDb.jobs.find(j => j._id === jobId);
    const jobTitle = mockJob ? mockJob.title : 'Job ID ' + jobId;

    const emailSubject = `Job Application: ${jobTitle}`;
    const emailMessage = `Applicant Name: ${name}\nPhone: ${phone}\nResume: ${resumeUrl}\n\nCover Letter:\n${coverLetter}`;

    if (isConnected) {
      await ContactSubmission.create({
        name,
        email,
        phone,
        department: 'grievance', // Router fallback
        subject: emailSubject,
        message: emailMessage,
      });
    } else {
      mockDb.contactSubmissions.push({
        _id: 'sub_' + Date.now(),
        name,
        email,
        phone,
        department: 'grievance',
        subject: emailSubject,
        message: emailMessage,
        status: 'unread',
        createdAt: new Date(),
      });
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to submit application' };
  }
}

// ----------------------------------------
// NOTIFICATION (CIRCULAR) CRUD ACTIONS
// ----------------------------------------
export async function createNotification(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as any;
  const targetAudience = formData.get('targetAudience') as any;
  const isUrgent = formData.get('isUrgent') === 'true';
  const file = formData.get('attachment') as File;

  if (!title || !content || !category || !targetAudience) {
    return { success: false, error: 'Required fields are missing' };
  }

  let attachmentUrl = '';
  if (file && file.size > 0) {
    attachmentUrl = await saveUpload(file);
  }

  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      await Notification.create({ title, content, category, targetAudience, isUrgent, attachmentUrl });
    } catch (err) {
      console.error(err);
    }
  } else {
    mockDb.notifications.unshift({
      _id: 'n_' + Date.now(),
      title,
      content,
      category,
      targetAudience,
      isUrgent,
      attachmentUrl,
      publishDate: new Date(),
    });
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteNotification(id: string) {
  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      await Notification.findByIdAndDelete(id);
    } catch (err) {
      console.error(err);
    }
  } else {
    mockDb.notifications = mockDb.notifications.filter((n) => n._id !== id);
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

// ----------------------------------------
// EVENTS (CALENDAR) CRUD ACTIONS
// ----------------------------------------
export async function createEvent(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const startDateStr = formData.get('startDate') as string;
  const endDateStr = formData.get('endDate') as string;
  const category = formData.get('category') as any;
  const location = formData.get('location') as string;

  if (!title || !startDateStr || !endDateStr || !category) {
    return { success: false, error: 'Required fields are missing' };
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      await Event.create({ title, description, startDate, endDate, category, location });
    } catch (err) {
      console.error(err);
    }
  } else {
    mockDb.events.push({
      _id: 'e_' + Date.now(),
      title,
      description,
      startDate,
      endDate,
      category,
      location: location || 'Vidyalaya Campus',
    });
  }

  revalidatePath('/academics');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteEvent(id: string) {
  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      await Event.findByIdAndDelete(id);
    } catch (err) {
      console.error(err);
    }
  } else {
    mockDb.events = mockDb.events.filter((e) => e._id !== id);
  }

  revalidatePath('/academics');
  revalidatePath('/admin');
  return { success: true };
}

// ----------------------------------------
// JOB POSTING CRUD ACTIONS
// ----------------------------------------
export async function createJobPosting(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const department = formData.get('department') as any;
  const description = formData.get('description') as string;
  const requirements = formData.get('requirements') as string;
  const experienceRequired = formData.get('experienceRequired') as string;

  if (!title || !department || !description || !requirements || !experienceRequired) {
    return { success: false, error: 'Required fields are missing' };
  }

  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      await JobPosting.create({ title, department, description, requirements, experienceRequired });
    } catch (err) {
      console.error(err);
    }
  } else {
    mockDb.jobs.unshift({
      _id: 'j_' + Date.now(),
      title,
      department,
      description,
      requirements,
      experienceRequired,
      isActive: true,
      createdAt: new Date(),
    });
  }

  revalidatePath('/careers');
  revalidatePath('/admin');
  return { success: true };
}

export async function toggleJobPosting(id: string, activeStatus: boolean) {
  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      await JobPosting.findByIdAndUpdate(id, { isActive: activeStatus });
    } catch (err) {
      console.error(err);
    }
  } else {
    const job = mockDb.jobs.find((j) => j._id === id);
    if (job) job.isActive = activeStatus;
  }

  revalidatePath('/careers');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteJobPosting(id: string) {
  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      await JobPosting.findByIdAndDelete(id);
    } catch (err) {
      console.error(err);
    }
  } else {
    mockDb.jobs = mockDb.jobs.filter((j) => j._id !== id);
  }

  revalidatePath('/careers');
  revalidatePath('/admin');
  return { success: true };
}

// ----------------------------------------
// COMPLIANCE DOCUMENTS CRUD ACTIONS
// ----------------------------------------
export async function createComplianceDoc(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as any;
  const boardCode = formData.get('boardCode') as any;
  const isPublic = formData.get('isPublic') === 'true';
  const file = formData.get('file') as File;

  if (!title || !category || !file || file.size === 0) {
    return { success: false, error: 'Required fields or file are missing' };
  }

  try {
    const docUrl = await saveUpload(file);

    const isConnected = await tryConnect();
    if (isConnected) {
      await ComplianceDocument.create({ title, category, docUrl, boardCode, isPublic });
    } else {
      mockDb.complianceDocs.unshift({
        _id: 'c_' + Date.now(),
        title,
        category,
        docUrl,
        boardCode,
        isPublic,
        uploadDate: new Date(),
      });
    }

    revalidatePath('/board-disclosure');
    revalidatePath('/board-inspection-hub');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Upload failed' };
  }
}

export async function deleteComplianceDoc(id: string) {
  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      await ComplianceDocument.findByIdAndDelete(id);
    } catch (err) {
      console.error(err);
    }
  } else {
    mockDb.complianceDocs = mockDb.complianceDocs.filter((c) => c._id !== id);
  }

  revalidatePath('/board-disclosure');
  revalidatePath('/board-inspection-hub');
  revalidatePath('/admin');
  return { success: true };
}

// ----------------------------------------
// INQUIRY RESOLUTION ACTION
// ----------------------------------------
export async function updateInquiryStatus(id: string, status: 'unread' | 'read' | 'resolved') {
  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      await ContactSubmission.findByIdAndUpdate(id, { status });
    } catch (err) {
      console.error(err);
    }
  } else {
    const sub = mockDb.contactSubmissions.find((s) => s._id === id);
    if (sub) sub.status = status;
  }

  revalidatePath('/admin');
  return { success: true };
}

export async function deleteInquiry(id: string) {
  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      await ContactSubmission.findByIdAndDelete(id);
    } catch (err) {
      console.error(err);
    }
  } else {
    mockDb.contactSubmissions = mockDb.contactSubmissions.filter((s) => s._id !== id);
  }

  revalidatePath('/admin');
  return { success: true };
}

// ----------------------------------------
// DATA FETCHING HELPERS
// ----------------------------------------
export async function fetchNotifications() {
  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      const items = await Notification.find().sort({ publishDate: -1 }).lean();
      return JSON.parse(JSON.stringify(items)) as MockNotification[];
    } catch (err) {
      console.error(err);
    }
  }
  return mockDb.notifications;
}

export async function fetchEvents() {
  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      const items = await Event.find().sort({ startDate: 1 }).lean();
      return JSON.parse(JSON.stringify(items)) as MockEvent[];
    } catch (err) {
      console.error(err);
    }
  }
  return mockDb.events;
}

export async function fetchJobs() {
  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      const items = await JobPosting.find().sort({ createdAt: -1 }).lean();
      return JSON.parse(JSON.stringify(items)) as MockJobPosting[];
    } catch (err) {
      console.error(err);
    }
  }
  return mockDb.jobs;
}

export async function fetchComplianceDocs() {
  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      const items = await ComplianceDocument.find().sort({ uploadDate: -1 }).lean();
      return JSON.parse(JSON.stringify(items)) as MockComplianceDocument[];
    } catch (err) {
      console.error(err);
    }
  }
  return mockDb.complianceDocs;
}

export async function fetchInquiries() {
  const isConnected = await tryConnect();
  if (isConnected) {
    try {
      const items = await ContactSubmission.find().sort({ createdAt: -1 }).lean();
      return JSON.parse(JSON.stringify(items)) as MockContactSubmission[];
    } catch (err) {
      console.error(err);
    }
  }
  return mockDb.contactSubmissions;
}
