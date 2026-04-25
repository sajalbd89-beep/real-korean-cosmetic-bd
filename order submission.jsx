import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.URL, process.env.KEY);

export default async function handler(req, res) {
  const order = req.body;

  const { data, error } = await supabase
    .from("orders")
    .insert([order]);

  if (error) return res.status(500).json({ error });

  // WhatsApp Trigger
  await sendWhatsApp(order.phone);

  res.status(200).json({ success: true });
}
