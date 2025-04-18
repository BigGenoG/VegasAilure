// /pages/api/log-booking.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // for inserts
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { trip_id, item, sid } = req.body;

  const { error } = await supabase
    .from('bookings')
    .insert([{ trip_id, item, sid, status: 'booked' }]);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Booking log failed' });
  }

  res.status(200).json({ success: true });
}
