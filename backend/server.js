
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));
app.use(express.urlencoded({ extended: true }));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// Health
app.get('/health', (req, res) => res.json({ status: 'BuildPrice Naija Backend Live on Render', time: new Date().toISOString() }));

// Prices API - Full material names, no abbreviations
app.get('/api/prices', async (req, res) => {
  const city = req.query.city || 'Lagos State';
  const { data, error } = await supabase.from('city_prices').select('*').eq('city', city).order('full_material_name');
  if(error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Paystack Webhook - Escrow + Price Lock
app.post('/api/paystack-webhook', async (req, res) => {
  const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(req.rawBody).digest('hex');
  if(hash !== req.headers['x-paystack-signature']) return res.status(401).send('Invalid signature');
  const event = req.body;
  if(event.event === 'charge.success'){
    const { reference, amount, metadata, customer } = event.data;
    if(metadata?.type === 'price_lock'){
      await supabase.from('price_lock_orders').insert({
        user_phone: customer.email,
        full_material_name: metadata.full_material_name || 'Dangote Portland Limestone Cement 42.5 Grade 50 Kilogram Bag',
        quantity: metadata.quantity,
        locked_price_in_naira: metadata.locked_price,
        paystack_reference: reference,
        expiry_date: new Date(Date.now() + 30*24*60*60*1000).toISOString(),
        status: 'active'
      });
    }
    if(metadata?.escrow){
      await supabase.from('orders').insert({
        user_phone: customer.email,
        full_material_name: metadata.full_material_name,
        quantity: metadata.quantity,
        total_amount_naira: amount/100,
        escrow_status: 'funds_held'
      });
    }
  }
  res.sendStatus(200);
});

// Auto-release escrow after delivery photo
app.put('/api/paystack-webhook/release', async (req, res) => {
  const { order_id, delivery_photo_url } = req.body;
  const { data: order } = await supabase.from('orders').update({
    delivery_photo_url, delivery_confirmed: true, escrow_status: 'released_to_seller'
  }).eq('id', order_id).select().single();
  if(!order) return res.status(404).json({ success: false });
  // Here trigger Paystack transfer 94% to seller
  const amount = Math.round(order.total_amount_naira * 0.94 * 100);
  console.log(`Releasing ${amount/100} Naira for ${order.full_material_name}`);
  res.json({ success: true, amount_released: amount/100, full_material_name: order.full_material_name });
});

// WhatsApp Bot - Twilio
app.post('/api/whatsapp', (req, res) => {
  const msg = (req.body.Body || '').toLowerCase();
  let reply = `BuildPrice Naija: Dangote Portland Limestone Cement 42.5 Grade 50 Kilogram Bag - 7,800 Naira Lagos State. Iron Rod 12 Millimeter - 9,200 Naira. Lock price? Pay 30% now. buildpricenaija.netlify.app`;
  if(msg.includes('cement')) reply = `Dangote Portland Limestone Cement 42.5 Grade 50 Kilogram Bag: Lagos State 7,800 Naira, Federal Capital Territory Abuja 8,400 Naira. BUA Cement 42.5 Grade: 7,500 Naira. Lock price 30 days with 2,500 Naira fee.`;
  if(msg.includes('iron rod')) reply = `Iron Rod 12 Millimeter High Tensile Strength 12 Meter Length: 9,200 Naira. Iron Rod 16 Millimeter: 12,500 Naira. Verified Authentic. Escrow Protected.`;
  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${reply} | Escrow Protected | Anti-Fake QR Verified</Message></Response>`;
  res.type('text/xml').send(twiml);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
