
# BuildPrice Naija Marketplace - Netlify + Render - Complete Solution

## Quick Deploy

### 1. Supabase Setup (2 mins)
Read supabase/SETUP_GUIDE.md
- Create project, run supabase/schema.sql

### 2. Environment Variables
- .env.netlify -> Paste into Netlify Dashboard
- .env.render -> Paste into Render Dashboard
- .env.example -> Template

### 3. Deploy
- Push to GitHub: JTOPENTLAB/Buildprice_Naija_Marketplace
- Netlify: Import repo, auto reads netlify.toml
- Render: New Blueprint, auto reads render.yaml (backend + cron scraper)

### 4. Architecture
Frontend: Netlify (app/index.html + components)
Backend: Render Node Express (backend/server.js)
Database: Supabase
Payments: Paystack Escrow + Price Lock
WhatsApp: Twilio Bot (Pidgin/Yoruba/Hausa/Igbo)
Scraper: Python cron daily 6AM WAT

### 5. No Abbreviations Policy
All materials use full names:
- Dangote Portland Limestone Cement 42.5 Grade 50 Kilogram Bag
- Iron Rod 12 Millimeter High Tensile Strength 12 Meter Length
- Sandcrete Blocks 9 Inch Vibrated 450 Millimeter
- Granite Stone 3/4 Inch Per Ton
- Sharp Sand Per Ton
- Ceramic Floor Tiles 60 by 60 Centimeter Per Square Meter

### 6. Money Model
- 6% commission
- 2,500 Naira lock fee per 100 bags
- Logistics 20,000 Naira per trip
- PRO 15,000/month

### 7. Files
- legal/SELLER_AGREEMENT... - Corporate Affairs Commission verified contract
- backend/server.js - Render backend with Paystack webhook auto-release escrow
- whatsapp-bot/bot.js - WhatsApp bot
- Pitch deck artifact in container
