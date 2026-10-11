
# DEPLOY - Netlify Frontend + Render Backend - No Verbal

## Frontend -> Netlify
1. Push repo to GitHub JTOPENTLAB/Buildprice_Naija_Marketplace
2. Netlify: New site from Git -> Select repo -> Build command: npm run build -> Publish: dist or app
3. Or drag and drop app/index.html to Netlify Drop
4. Environment variables in Netlify UI:
   NEXT_PUBLIC_BACKEND_URL=https://buildprice-naija-backend.onrender.com
   NEXT_PUBLIC_SUPABASE_URL=your supabase url

netlify.toml already configured to proxy /api/* to Render.

## Backend -> Render
1. Render.com -> New Web Service -> Connect same GitHub repo
2. Root Directory: backend
3. Build: npm install
4. Start: node server.js
5. Add env vars in Render dashboard:
   PAYSTACK_SECRET_KEY=sk_live_xxx
   SUPABASE_URL=...
   SUPABASE_SERVICE_KEY=...
   TWILIO_ACCOUNT_SID=...
   TWILIO_AUTH_TOKEN=...

6. render.yaml will auto-create:
   - Web service: buildprice-naija-backend
   - Cron job: price-scraper-daily runs 6AM WAT daily

## Health Check
Frontend: https://your-site.netlify.app
Backend: https://buildprice-naija-backend.onrender.com/health

## Paystack Webhook URL
Set in Paystack dashboard: https://buildprice-naija-backend.onrender.com/api/paystack-webhook

## WhatsApp Webhook URL
Twilio dashboard: https://buildprice-naija-backend.onrender.com/api/whatsapp
