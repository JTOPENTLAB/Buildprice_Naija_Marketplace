
# ALL PROMPTS TO BUILD BUILDPRICE NAIJA - NO ABBREVIATIONS

## 1. MASTER PLATFORM PROMPT FOR LOVABLE.DEV / BOLT.NEW
Build a full marketplace called Buildprice Naija Marketplace.

Requirements - Use full material names always, never abbreviate:
- Cement (Dangote Portland Limestone Cement 42.5 Grade, BUA Cement 42.5 Grade, Lafarge Elephant Cement 42.5 Grade)
- Iron Rod 12 Millimeter, Iron Rod 16 Millimeter, Iron Rod 10 Millimeter, Iron Rod 8 Millimeter
- Reinforcement Steel Binding Wire
- Sandcrete Blocks 9 Inch, Sandcrete Blocks 6 Inch
- Granite 3/4 Inch, Granite 1/2 Inch
- Sharp Sand, Plaster Sand, Filling Sand
- Roofing Sheets 0.45 Millimeter Longspan Aluminium, Stone Coated Roofing Tiles
- Ceramic Floor Tiles 60 by 60 Centimeter, Wall Tiles
- Plumbing Materials: Pipes, Water Closet, Wash Hand Basin
- Electrical Materials: Cables, Distribution Board, Switches

Features:
1. Live Price Intelligence Dashboard: Show city prices for Lagos State, Federal Capital Territory Abuja, Rivers State Port Harcourt, Kano State, Oyo State Ibadan, Enugu State. Show 7-day trend chart.
2. Verified Marketplace: Each seller shows Corporate Affairs Commission number, verified badge, escrow protected, anti-fake QR verification for Cement.
3. Group Buying: Pool 10 buyers in same Local Government Area to get 15 percent discount.
4. Logistics: Calculate delivery cost from depot to building site using distance.
5. Buy Now Build Later: Lock Cement price for 30 days with 30 percent deposit. Use Paystack.
6. Bill Of Quantities to Cart: Upload building plan PDF, AI extracts materials.
7. WhatsApp Bot: Support English, Pidgin, Yoruba, Hausa, Igbo.

## 2. DATABASE SCHEMA PROMPT
Supabase tables: sellers, products (full_material_name, category, description), city_prices (city, state, price_naira, trend, last_updated), orders (escrow_status), price_lock_orders, group_buy_pools.

## 3. ANTI-FAKE VERIFICATION PROMPT
Implement QR code scan for Cement bags using manufacturer API. Show green check Verified Authentic.

## 4. MONEY MAKING PROMPT
Implement 6 percent commission, price lock fee, logistics margin, subscription.

## 5. SEO PROMPT
Create pages: /price-of-cement-in-lagos-today, /price-of-iron-rod-12mm-in-nigeria-today, /building-materials-price-in-abuja etc with daily updated prices.
