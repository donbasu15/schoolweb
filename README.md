# Vidyalaya Academy - School Portal & Compliance Hub

An enterprise-grade school website and administrative CMS portal built with **Next.js 14+ (App Router)**, **Tailwind CSS v4**, and **TypeScript**, designed for CBSE and Right to Education (RTE) compliance in India.

---

## Key Features

- **CBSE & RTE Compliance Public Disclosures**: Dedicated mandatory disclosures section displaying affiliation certificates, committee rosters, and sanitary/safety logs.
- **Interactive Term Calendar**: Interactive monthly calendar with dynamic category filtering and official standard **iCal (.ics) format file exports** for syncing to Google Calendar or Apple Calendar.
- **Department-Routed Messaging**: Contact inquiries route directly to specialized departments (`admissions`, `accounts`, `transport`, `grievance`) from the client to the database inbox.
- **Staff Recruitment Portal**: Vacancies board allowing candidates to apply online and upload their PDF CVs/resumes.
- **Admin CMS Dashboard**: Secure administrative portal to manage circulars, post calendar events, toggle job openings, and read/resolve routed inbox submissions.
- **Secure Inspector Hub**: Restricted portal accessible via token validation for review of private regulatory documents (e.g. State NOCs, Land Deeds).
- **High Availability Connection Fallback**: Graceful connection state helper that automatically switches to an in-memory data store (`mockDb`) if MongoDB is offline, allowing the build and runtime to function out-of-the-box.

---

## 🔑 Demo Credentials & Access Codes

Use these credentials to evaluate the protected workspace areas:

| Environment | URL Path | Verification Input |
|---|---|---|
| **Administrative Desk** | `/admin/login` | Email: `admin@vidyalaya.edu.in`<br>Password: `admin123` |
| **Inspector Verification Portal** | `/board-inspection-hub/login` | Access Code: `INSPECT2026` |

---

## ⚡ Deployment to Netlify

This project is configured and ready for single-click deployment on Netlify using the Netlify Next.js runtime.

### Step 1: Create configuration
The root `netlify.toml` file is configured with the standard Next.js settings:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Step 2: Configure Environment Variables in Netlify
To make database writing, session creation, and inspector log-ins persistent, define the following variables in the **Netlify Team Console (Site Configuration > Environment Variables)**:

| Key | Example Value | Description |
|---|---|---|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` | MongoDB connection string (Mongoose fallback engages if unset). |
| `JWT_SECRET` | `super-secret-jwt-token-string-12345` | Random cryptographic string used to sign session cookies. |
| `INSPECTOR_CODE` | `INSPECT2026` | Alphanumeric code used by official inspectors to verify private deeds. |

---

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root folder:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/vidyalaya
JWT_SECRET=your_jwt_signing_key_secret
INSPECTOR_CODE=INSPECT2026
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.
# schoolweb
