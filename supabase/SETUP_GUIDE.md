
# SUPABASE SETUP - 2 MINUTES

1. Go to supabase.com -> New Project -> Name: buildprice-naija
2. Region: Closest to Nigeria (EU West or Singapore)
3. Once created, go to Project Settings -> API
4. Copy:
   - Project URL -> NEXT_PUBLIC_SUPABASE_URL
   - anon public key -> NEXT_PUBLIC_SUPABASE_ANON_KEY
   - service_role secret key -> SUPABASE_SERVICE_KEY (KEEP SECRET, ONLY FOR RENDER)

5. Go to SQL Editor -> Paste contents of supabase/schema.sql -> Run
   This creates:
   - sellers (with Corporate Affairs Commission verification)
   - products (full material names no abbreviations)
   - city_prices (Lagos State, Federal Capital Territory Abuja etc)
   - orders (escrow)
   - price_lock_orders
   - group_buy_pools
   - logistics_drivers

6. Seed data: Already in schema.sql includes:
   Dangote Portland Limestone Cement 42.5 Grade 50 Kilogram Bag
   BUA Cement 42.5 Grade 50 Kilogram Bag
   Iron Rod 12 Millimeter High Tensile Strength 12 Meter Length
   etc.

7. Enable Row Level Security off for now (or add policies later)

8. Copy keys into .env.netlify and .env.render files and paste into Netlify/Render dashboards.
