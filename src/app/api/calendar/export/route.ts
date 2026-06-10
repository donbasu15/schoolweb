import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Event } from '@/lib/models';
import { mockDb } from '@/lib/mockStore';

function formatICSDate(dateInput: string | Date): string {
  const date = new Date(dateInput);
  // Returns date formatted as YYYYMMDDTHHMMSSZ
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export async function GET() {
  let eventsList = [];

  try {
    await connectToDatabase();
    eventsList = await Event.find().lean();
  } catch (error) {
    console.warn('MongoDB connection failed for ICS export. Utilizing mockDb events fallback.');
    eventsList = mockDb.events;
  }

  // Build ICS file content
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Vidyalaya Academy//School Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ].join('\r\n') + '\r\n';

  eventsList.forEach((event: any) => {
    const startStr = formatICSDate(event.startDate);
    const endStr = formatICSDate(event.endDate);
    const uid = event._id.toString();
    const summary = event.title.replace(/[,;]/g, '\\$&');
    const description = (event.description || '').replace(/[,;]/g, '\\$&');
    const location = (event.location || 'Vidyalaya Campus').replace(/[,;]/g, '\\$&');

    icsContent += [
      'BEGIN:VEVENT',
      `UID:${uid}@vidyalaya.edu.in`,
      `DTSTAMP:${startStr}`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'END:VEVENT'
    ].join('\r\n') + '\r\n';
  });

  icsContent += 'END:VCALENDAR';

  // Return text/calendar file response
  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="vidyalaya-events.ics"',
    },
  });
}
