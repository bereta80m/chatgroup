/*import {EmailTemplate} from "../../components/email-template"
import { NextResponse } from 'next/server';
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);


// En un archivo types.ts
export interface EmailData {
    to: string[];
    subject: string;
  }
  
export async function POST(request: { json: () => Promise<EmailData> }) {
    const body = await request.json();
    // Utiliza el tipo EmailData para tipar los datos
    const { to, subject } = body;

  try {
    const data = await resend.emails.send({
      from: 'Acme <Noreply@resend.dev>',
      to: ['bereta80m@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John Machu' }) as React.ReactElement,
    });

    return NextResponse.json('data');
  } catch (error) {
    return NextResponse.json({ error });
  }
}
*/