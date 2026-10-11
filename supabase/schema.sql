
-- Buildprice Naija - Full Schema No Abbreviations
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE sellers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL,
  corporate_affairs_commission_number TEXT UNIQUE NOT NULL,
  phone_number TEXT NOT NULL,
  state TEXT NOT NULL,
  local_government_area TEXT NOT NULL,
  verification_status TEXT DEFAULT 'pending',
  verified_badge BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_material_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  unit_of_measurement TEXT NOT NULL,
  anti_fake_qr_code TEXT,
  seller_id uuid REFERENCES sellers(id),
  verified_authentic BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE city_prices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid REFERENCES products(id),
  full_material_name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  price_in_naira INTEGER NOT NULL,
  previous_price_in_naira INTEGER,
  trend_percentage DECIMAL,
  source_market_name TEXT,
  last_updated TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_phone TEXT NOT NULL,
  full_material_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  total_amount_naira INTEGER NOT NULL,
  escrow_status TEXT DEFAULT 'funds_held',
  delivery_address TEXT,
  delivery_local_government_area TEXT,
  delivery_photo_url TEXT,
  delivery_confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE price_lock_orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_phone TEXT NOT NULL,
  full_material_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  locked_price_in_naira INTEGER NOT NULL,
  lock_fee_in_naira INTEGER DEFAULT 2500,
  deposit_percentage INTEGER DEFAULT 30,
  deposit_paid_naira INTEGER,
  remaining_balance_naira INTEGER,
  expiry_date TIMESTAMPTZ,
  paystack_reference TEXT,
  status TEXT DEFAULT 'active'
);

CREATE TABLE group_buy_pools (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_material_name TEXT NOT NULL,
  city TEXT NOT NULL,
  target_quantity INTEGER NOT NULL,
  current_quantity INTEGER DEFAULT 0,
  discount_percentage INTEGER DEFAULT 15,
  expiry_date TIMESTAMPTZ,
  status TEXT DEFAULT 'open'
);

CREATE TABLE logistics_drivers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  driver_name TEXT NOT NULL,
  truck_capacity_in_tons INTEGER,
  phone_number TEXT,
  current_city TEXT,
  is_available BOOLEAN DEFAULT true
);

-- Seed with full names no abbreviations
INSERT INTO products (full_material_name, category, unit_of_measurement, description) VALUES
('Dangote Portland Limestone Cement 42.5 Grade 50 Kilogram Bag', 'Cement', '50 Kilogram Bag', 'High quality Portland Limestone Cement for strong buildings'),
('BUA Cement 42.5 Grade 50 Kilogram Bag', 'Cement', '50 Kilogram Bag', 'BUA Cement competitive quality'),
('Lafarge Elephant Cement 42.5 Grade 50 Kilogram Bag', 'Cement', '50 Kilogram Bag', 'Lafarge consistent quality cement'),
('Iron Rod 12 Millimeter High Tensile Strength 12 Meter Length', 'Reinforcement Steel', '12 Meter Length', 'High tensile reinforcement steel'),
('Iron Rod 16 Millimeter High Tensile Strength 12 Meter Length', 'Reinforcement Steel', '12 Meter Length', 'High tensile reinforcement steel'),
('Iron Rod 10 Millimeter High Tensile Strength 12 Meter Length', 'Reinforcement Steel', '12 Meter Length', 'For stirrups and distribution'),
('Iron Rod 8 Millimeter High Tensile Strength 12 Meter Length', 'Reinforcement Steel', '12 Meter Length', 'For binding and light works'),
('Sandcrete Blocks 9 Inch Vibrated 450 Millimeter', 'Blocks', 'Per Block', 'Strong vibrated 9 inch blocks'),
('Sandcrete Blocks 6 Inch Vibrated 450 Millimeter', 'Blocks', 'Per Block', '6 inch partition blocks'),
('Granite Stone 3/4 Inch Per Ton', 'Granite', 'Per Ton', '3/4 inch granite for concrete'),
('Granite Stone 1/2 Inch Per Ton', 'Granite', 'Per Ton', '1/2 inch granite'),
('Sharp Sand Per Ton', 'Sand', 'Per Ton', 'Clean sharp sand'),
('Plaster Sand Per Ton', 'Sand', 'Per Ton', 'Fine plaster sand'),
('Filling Sand Per Ton', 'Sand', 'Per Ton', 'Filling sand for foundation'),
('Longspan Aluminium Roofing Sheets 0.45 Millimeter', 'Roofing Sheets', 'Per Square Meter', '0.45mm longspan aluminium'),
('Stone Coated Roofing Tiles Per Square Meter', 'Roofing Sheets', 'Per Square Meter', 'Stone coated tiles'),
('Ceramic Floor Tiles 60 by 60 Centimeter Per Square Meter', 'Ceramic Tiles', 'Per Square Meter', '60x60 floor tiles Spanish design'),
('Ceramic Wall Tiles 30 by 60 Centimeter Per Square Meter', 'Ceramic Tiles', 'Per Square Meter', 'Wall tiles'),
('Reinforcement Steel Binding Wire Per Roll', 'Reinforcement Steel', 'Per Roll', 'Binding wire for iron rod');
