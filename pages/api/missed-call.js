import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SMS_BODY =
  "Hey, sorry we missed you — this is Fieldline demo. What can we help with today?";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Twilio sends form-encoded bodies; Next.js parses them automatically
  const callerNumber = req.body?.From;
  const callStatus = req.body?.CallStatus;

  // Only act on unanswered calls
  if (!callerNumber || callStatus !== 'no-answer') {
    return res.status(200).send('<Response></Response>');
  }

  let smsSent = false;

  try {
    await twilioClient.messages.create({
      body: SMS_BODY,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: callerNumber,
    });
    smsSent = true;
  } catch (err) {
    console.error('Twilio SMS error:', err.message);
  }

  try {
    await supabase.from('leads').insert({
      caller_number: callerNumber,
      call_time: new Date().toISOString(),
      sms_sent: smsSent,
    });
  } catch (err) {
    console.error('Supabase insert error:', err.message);
  }

  // Respond with empty TwiML so Twilio doesn't complain
  res.setHeader('Content-Type', 'text/xml');
  return res.status(200).send('<Response></Response>');
}
