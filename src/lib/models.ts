import mongoose, { Schema } from 'mongoose';

// ----------------------------------------
// 1. User Model
// ----------------------------------------
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'staff'], default: 'staff' },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);

// ----------------------------------------
// 2. Notification (Circulars) Model
// ----------------------------------------
const NotificationSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['general', 'academic', 'admissions', 'exam'], 
    default: 'general' 
  },
  targetAudience: { 
    type: String, 
    enum: ['all', 'parents', 'students', 'staff'], 
    default: 'all' 
  },
  attachmentUrl: { type: String, default: '' },
  isUrgent: { type: Boolean, default: false },
  publishDate: { type: Date, default: Date.now, index: true },
  expiryDate: { type: Date },
});

export const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

// ----------------------------------------
// 3. Event Model
// ----------------------------------------
const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  startDate: { type: Date, required: true, index: true },
  endDate: { type: Date, required: true },
  category: { 
    type: String, 
    enum: ['exam', 'holiday', 'sports', 'cultural', 'academic'], 
    default: 'academic' 
  },
  location: { type: String, default: 'Vidyalaya Campus' },
});

export const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

// ----------------------------------------
// 4. Job Posting Model
// ----------------------------------------
const JobPostingSchema = new Schema({
  title: { type: String, required: true },
  department: { 
    type: String, 
    enum: ['academic', 'admin', 'support'], 
    required: true 
  },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  experienceRequired: { type: String, required: true },
  isActive: { type: Boolean, default: true, index: true },
  createdAt: { type: Date, default: Date.now },
});

export const JobPosting = mongoose.models.JobPosting || mongoose.model('JobPosting', JobPostingSchema);

// ----------------------------------------
// 5. Compliance Document Model
// ----------------------------------------
const ComplianceDocumentSchema = new Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['safety', 'academic', 'land_deed', 'noc', 'smc', 'pta'], 
    required: true,
    index: true
  },
  docUrl: { type: String, required: true },
  boardCode: { type: String, enum: ['CBSE', 'ICSE', 'STATE'], default: 'CBSE' },
  isPublic: { type: Boolean, default: true, index: true }, // true = public board-disclosure, false = private inspector dashboard only
  uploadDate: { type: Date, default: Date.now },
});

export const ComplianceDocument = mongoose.models.ComplianceDocument || mongoose.model('ComplianceDocument', ComplianceDocumentSchema);

// ----------------------------------------
// 6. Contact Submission Model
// ----------------------------------------
const ContactSubmissionSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  department: { 
    type: String, 
    enum: ['admissions', 'accounts', 'transport', 'grievance'], 
    required: true,
    index: true
  },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read', 'resolved'], default: 'unread', index: true },
  createdAt: { type: Date, default: Date.now },
});

export const ContactSubmission = mongoose.models.ContactSubmission || mongoose.model('ContactSubmission', ContactSubmissionSchema);
