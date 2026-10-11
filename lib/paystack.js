
import axios from 'axios';
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
export async function initializeEscrowPayment({email, amountInKobo, fullMaterialName, quantity}){
  const response = await axios.post('https://api.paystack.co/transaction/initialize', {
    email, amount: amountInKobo,
    metadata: { full_material_name: fullMaterialName, quantity, escrow: true },
  }, { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` }});
  return response.data;
}
export async function createPriceLock({email, quantity, lockedPrice}){
  const total = lockedPrice * quantity;
  const deposit = Math.round(total * 0.30);
  const lockFee = 2500;
  const amountToCharge = (deposit + lockFee) * 100;
  const response = await axios.post('https://api.paystack.co/transaction/initialize', {
    email, amount: amountToCharge,
    metadata: { type: 'price_lock', locked_price: lockedPrice, quantity, lock_fee: lockFee }
  }, { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` }});
  return response.data;
}
