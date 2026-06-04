import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';

const TWIML_EMPTY = '<Response></Response>';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const callerNumber = req.body?.From;
  const messageBody = req.body?.Body;

  if (!callerNumber || !messageBody) {
    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(TWIML_EMPTY);
  }

  const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Update the most recent lead from this caller with their reply
  try {
    const { data: leads, error: fetchError } = await supabase
      .from('leads')
      .select('id')
      .eq('caller_number', callerNumber)
      .order('call_time', { ascending: false })
      .limit(1);

    if (fetchError) throw fetchError;

    if (leads?.length > 0) {
      const { error: updateError } = await supabase
        .from('leads')
        .update({ reply_text: messageBody })
        .eq('id', leads[0].id);

      if (updateError) throw updateError;
    }
  } catch (err) {
    console.error('Supabase reply update error:', err.message);
  }

  // Forward the reply to the business owner
  try {
    await twilioClient.messages.create({
      body: `📞 Catchcall: New reply from ${callerNumber} — "${messageBody}". Call them back to book the job.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.NOTIFY_PHONE_NUMBER,
    });
  } catch (err) {
    console.error('Twilio forward error:', err.message);
  }

  res.setHeader('Content-Type', 'text/xml');
  return res.status(200).send(TWIML_EMPTY);
}
