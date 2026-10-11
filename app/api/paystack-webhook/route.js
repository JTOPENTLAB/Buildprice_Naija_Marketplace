
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

export async function POST(req){
  const body = await req.text();
  const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(body).digest('hex');
  const signature = req.headers.get('x-paystack-signature');
  
  if(hash !== signature){
    return new Response('Invalid signature', {status: 401});
  }

  const event = JSON.parse(body);
  
  // 1. ESCROW PAYMENT SUCCESS
  if(event.event === 'charge.success'){
    const { reference, amount, metadata, customer } = event.data;
    const { full_material_name, quantity, escrow, type } = metadata || {};

    if(type === 'price_lock'){
      // Create price lock order
      await supabase.from('price_lock_orders').insert({
        user_phone: customer.email,
        full_material_name: full_material_name || 'Dangote Portland Limestone Cement 42.5 Grade 50 Kilogram Bag',
        quantity: quantity,
        locked_price_in_naira: metadata.locked_price,
        lock_fee_in_naira: metadata.lock_fee,
        paystack_reference: reference,
        expiry_date: new Date(Date.now() + 30*24*60*60*1000).toISOString(), // 30 days
        status: 'active'
      });
      console.log(`Price Lock Active for ${full_material_name} - ${quantity} bags`);
    }

    if(escrow){
      // Create escrow order - funds held
      await supabase.from('orders').insert({
        user_phone: customer.email,
        full_material_name: full_material_name,
        quantity: quantity,
        total_amount_naira: amount / 100,
        escrow_status: 'funds_held', // Money with Paystack, 94% to seller pending delivery
        delivery_confirmed: false
      });
      console.log(`Escrow Held for ${full_material_name}`);
    }
  }

  // 2. AUTO-RELEASE ESCROW AFTER DELIVERY CONFIRMATION
  // This endpoint called by admin app when buyer confirms delivery with photo
  return new Response('Webhook processed', {status: 200});
}

export async function PUT(req){
  // Auto-release escrow endpoint - call when delivery photo uploaded and confirmed
  const { order_id, delivery_photo_url } = await req.json();
  
  // Update order as delivered
  const { data: order } = await supabase.from('orders').update({
    delivery_photo_url,
    delivery_confirmed: true,
    escrow_status: 'released_to_seller'
  }).eq('id', order_id).select().single();

  if(order){
    // Trigger Paystack transfer to seller (94%)
    // Paystack Transfer API - 94% to seller subaccount
    const transferAmount = Math.round(order.total_amount_naira * 0.94 * 100); // kobo
    
    // In production: await paystackTransfer({ amount: transferAmount, recipient: seller_recipient_code })
    console.log(`Releasing ${transferAmount/100} Naira to seller for order ${order_id} - ${order.full_material_name}`);
    
    return Response.json({ success: true, message: `Escrow released for ${order.full_material_name}`, amount_released: transferAmount/100 });
  }

  return Response.json({ success: false }, {status: 404});
}
