
const twilio = require('twilio');
const priceList = {"cement":"Dangote Portland Limestone Cement 42.5 Grade 50 Kilogram Bag - 7,800 Naira Lagos State","iron rod 12 millimeter":"Iron Rod 12 Millimeter High Tensile Strength 12 Meter Length - 9,200 Naira"};
function replyInLanguage(lang, msg){return (lang==='yoruba'?`E kaaro, ${priceList[msg]||'Check app'}`:lang==='hausa'?`Sannu, ${priceList[msg]}`:`Oga, price be ${priceList[msg]||'check BuildPrice Naija'}. You wan lock price? Pay 30 percent now.`);}
exports.handler = async (req,res)=>{const m=req.body.Body.toLowerCase();let lang='pidgin';if(m.includes('bawo'))lang='yoruba';if(m.includes('sannu'))lang='hausa';const twiml=new twilio.twiml.MessagingResponse();twiml.message(replyInLanguage(lang,m)+"\nOrder: buildpricenaija.com | Escrow Protected | Anti-Fake QR Verified");res.send(twiml.toString());};
