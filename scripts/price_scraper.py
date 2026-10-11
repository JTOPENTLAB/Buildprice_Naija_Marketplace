
import os
from datetime import datetime
from supabase import create_client
supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
materials = ["Dangote Portland Limestone Cement 42.5 Grade 50 Kilogram Bag","BUA Cement 42.5 Grade 50 Kilogram Bag","Iron Rod 12 Millimeter High Tensile Strength 12 Meter Length","Iron Rod 16 Millimeter High Tensile Strength 12 Meter Length","Sandcrete Blocks 9 Inch Vibrated 450 Millimeter","Granite Stone 3/4 Inch Per Ton","Sharp Sand Per Ton"]
markets = [{"city":"Lagos State","source":"Ladipo Market"},{"city":"Federal Capital Territory Abuja","source":"Dei-Dei Building Materials Market"}]
for market in markets:
 for mat in materials:
  supabase.table("city_prices").insert({"full_material_name":mat,"city":market["city"],"state":market["city"],"price_in_naira":7800,"source_market_name":market["source"],"last_updated":datetime.now().isoformat()}).execute()
