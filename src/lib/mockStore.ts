import bcrypt from 'bcryptjs';

// In-memory mock database structure
export interface MockNotification {
  _id: string;
  title: string;
  content: string;
  category: 'general' | 'academic' | 'admissions' | 'exam';
  targetAudience: 'all' | 'parents' | 'students' | 'staff';
  attachmentUrl: string;
  isUrgent: boolean;
  publishDate: Date;
  expiryDate?: Date;
}

export interface MockEvent {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: 'exam' | 'holiday' | 'sports' | 'cultural' | 'academic';
  location: string;
}

export interface MockJobPosting {
  _id: string;
  title: string;
  department: 'academic' | 'admin' | 'support';
  description: string;
  requirements: string;
  experienceRequired: string;
  isActive: boolean;
  createdAt: Date;
}

export interface MockComplianceDocument {
  _id: string;
  title: string;
  category: 'safety' | 'academic' | 'land_deed' | 'noc' | 'smc' | 'pta';
  docUrl: string;
  boardCode: 'CBSE' | 'ICSE' | 'STATE';
  isPublic: boolean;
  uploadDate: Date;
}

export interface MockContactSubmission {
  _id: string;
  name: string;
  email: string;
  phone: string;
  department: 'admissions' | 'accounts' | 'transport' | 'grievance';
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'resolved';
  createdAt: Date;
}

export interface MockUser {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'staff';
  createdAt: Date;
}

class MockDatabase {
  users: MockUser[] = [];
  notifications: MockNotification[] = [];
  events: MockEvent[] = [];
  jobs: MockJobPosting[] = [];
  complianceDocs: MockComplianceDocument[] = [];
  contactSubmissions: MockContactSubmission[] = [];

  constructor() {
    this.seed();
  }

  private seed() {
    // Seed admin (password is admin123)
    const salt = bcrypt.genSaltSync(10);
    this.users.push({
      _id: 'u_1',
      name: 'Dr. Ramesh Kumar (Administrator)',
      email: 'admin@vidyalaya.edu.in',
      passwordHash: bcrypt.hashSync('admin123', salt),
      role: 'admin',
      createdAt: new Date(),
    });

    // Seed staff (password is staff123)
    this.users.push({
      _id: 'u_2',
      name: 'Sunita Sharma (Academic Coordinator)',
      email: 'staff@vidyalaya.edu.in',
      passwordHash: bcrypt.hashSync('staff123', salt),
      role: 'staff',
      createdAt: new Date(),
    });

    // Seed Notifications (Circulars)
    this.notifications.push(
      {
        _id: 'n_1',
        title: 'CBSE Secondary School Board Registration 2026-27',
        content: 'Registration forms for CBSE Class X and XII Board Examinations are now open. Parents are requested to verify the spelling of names, DOB, and subjects before final submission. Late submissions will attract penalty charges as per board guidelines.',
        category: 'exam',
        targetAudience: 'parents',
        attachmentUrl: '/uploads/demo-cbse-registration.pdf',
        isUrgent: true,
        publishDate: new Date(),
      },
      {
        _id: 'n_2',
        title: 'Admissions Open for Academic Session 2026 - 2027',
        content: 'Registration portals are now active for Nursery to Grade IX and Grade XI. Entrance examinations and interaction sessions are scheduled for the third week of July. Seats are limited under RTE reservation criteria.',
        category: 'admissions',
        targetAudience: 'all',
        attachmentUrl: '/uploads/admissions-guidelines.pdf',
        isUrgent: false,
        publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        _id: 'n_3',
        title: 'Inter-School Football Tournament Selection Trials',
        content: 'Trials for the Under-17 Boys and Under-15 Girls school football teams will take place at the main sports complex. Interested students must register with the sports department wearing appropriate kit and shin guards.',
        category: 'general',
        targetAudience: 'students',
        attachmentUrl: '',
        isUrgent: false,
        publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      }
    );

    // Seed Events (Calendar)
    const today = new Date();
    this.events.push(
      {
        _id: 'e_1',
        title: 'First Periodic Unit Test (Classes I - XII)',
        description: 'First formal evaluations for all terms will begin next week. Full schedules and syllabus breakdowns are posted on the notice board.',
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
        category: 'exam',
        location: 'Respective Classrooms',
      },
      {
        _id: 'e_2',
        title: 'Annual Parent-Teacher Association (PTA) General Meet',
        description: 'Joint deliberation on academic objectives, extracurricular plans, and feedback collection for the current term.',
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12, 9, 30),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12, 13, 0),
        category: 'academic',
        location: 'Main School Auditorium',
      },
      {
        _id: 'e_3',
        title: 'Independence Day Celebrations & Cultural Show',
        description: 'Flag hoisting ceremony followed by patriotic songs, speech contest, and award distribution.',
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15, 8, 0),
        endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15, 12, 0),
        category: 'cultural',
        location: 'School Playground',
      }
    );

    // Seed Jobs (Careers)
    this.jobs.push(
      {
        _id: 'j_1',
        title: 'PGT Physics Teacher (Senior Secondary)',
        department: 'academic',
        description: 'We are seeking a highly passionate, post-graduate Physics teacher to instruct Classes XI and XII. The candidate should be adept at conceptualizing abstract physics laws, preparing students for competitive boards (JEE/NEET), and leading composite laboratory classes.',
        requirements: 'M.Sc. in Physics, B.Ed. degree mandatory. Proficiency in teaching in English.',
        experienceRequired: '3-5 years teaching in a CBSE/ICSE affiliated school.',
        isActive: true,
        createdAt: new Date(),
      },
      {
        _id: 'j_2',
        title: 'Administrative Officer & Front Desk Executive',
        department: 'admin',
        description: 'Responsible for public relations, managing visitor registers, answering queries on school facilities/fee payments, routing calls, and drafting correspondence.',
        requirements: 'Bachelors degree, excellent communication skills (English & Hindi), hands-on MS Office/Excel experience.',
        experienceRequired: '2+ years in public administration or hospitality role.',
        isActive: true,
        createdAt: new Date(),
      }
    );

    // Seed Compliance Documents (Disclosures)
    this.complianceDocs.push(
      {
        _id: 'c_1',
        title: 'CBSE Affiliation Status & Certificate (Affiliation No: 1930058)',
        category: 'academic',
        docUrl: '/uploads/cbse_affiliation.pdf',
        boardCode: 'CBSE',
        isPublic: true,
        uploadDate: new Date(),
      },
      {
        _id: 'c_2',
        title: 'School Management Committee (SMC) Members List & Tenure',
        category: 'smc',
        docUrl: '/uploads/smc_members.pdf',
        boardCode: 'CBSE',
        isPublic: true,
        uploadDate: new Date(),
      },
      {
        _id: 'c_3',
        title: 'Parent Teacher Association (PTA) Executive Body',
        category: 'pta',
        docUrl: '/uploads/pta_constitution.pdf',
        boardCode: 'CBSE',
        isPublic: true,
        uploadDate: new Date(),
      },
      {
        _id: 'c_4',
        title: 'Structural Stability & Fire Safety Clearance Certificate',
        category: 'safety',
        docUrl: '/uploads/fire_safety.pdf',
        boardCode: 'CBSE',
        isPublic: true,
        uploadDate: new Date(),
      },
      {
        _id: 'c_5',
        title: 'Water Health and Sanitary Certificate',
        category: 'safety',
        docUrl: '/uploads/sanitary_cert.pdf',
        boardCode: 'CBSE',
        isPublic: true,
        uploadDate: new Date(),
      },
      // PRIVATE INSPECTOR DEEDS
      {
        _id: 'c_6',
        title: 'NOC from State Education Department (No Objection Certificate)',
        category: 'noc',
        docUrl: '/uploads/state_noc.pdf',
        boardCode: 'STATE',
        isPublic: false,
        uploadDate: new Date(),
      },
      {
        _id: 'c_7',
        title: 'Land Deed Registration Documents & Building Safety Plan',
        category: 'land_deed',
        docUrl: '/uploads/land_deed.pdf',
        boardCode: 'CBSE',
        isPublic: false,
        uploadDate: new Date(),
      }
    );

    // Seed Contact submissions
    this.contactSubmissions.push(
      {
        _id: 's_1',
        name: 'Amit Patel',
        email: 'amit.patel@gmail.com',
        phone: '9876543210',
        department: 'admissions',
        subject: 'Inquiry regarding Nursery admission criteria',
        message: 'Hello, I want to know what is the age limit for Nursery admission for the coming term, and what documents are required for application under the RTE quota.',
        status: 'unread',
        createdAt: new Date(),
      }
    );
  }
}

// Global variable pattern to persist mock state in Next.js development
declare global {
  // eslint-disable-next-line no-var
  var mockDb: MockDatabase | undefined;
}

if (!global.mockDb) {
  global.mockDb = new MockDatabase();
}

export const mockDb = global.mockDb;
export const INSPECTION_SECRET_TOKEN = process.env.INSPECTOR_CODE || 'INSPECT2026';
export const ADMIN_FALLBACK_DEFAULT = { email: 'admin@vidyalaya.edu.in', password: 'admin123' };
export const STAFF_FALLBACK_DEFAULT = { email: 'staff@vidyalaya.edu.in', password: 'staff123' };
