-- Bubble Bee Database Initialization Script

-- 1. Create Enums
CREATE TYPE user_role AS ENUM ('OWNER', 'MANAGER', 'STAFF');
CREATE TYPE booking_status AS ENUM ('PENDING', 'STARTED', 'COMPLETED', 'DELAYED');

-- 2. Profiles Table (Linked to Authentication)
CREATE TABLE public.staff_profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  full_name text,
  role user_role default 'STAFF'::user_role not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Dynamic Slot Capacities (Manager can adjust 0 to 5)
CREATE TABLE public.slot_capacity (
  id serial primary key,
  date date not null,
  time_slot text not null,
  max_capacity integer default 2
);
ALTER TABLE public.slot_capacity ADD CONSTRAINT unique_date_time UNIQUE (date, time_slot);

-- 4. Bookings Core Table
CREATE TABLE public.bookings (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  service_type text not null,
  date date not null,
  time_slot text not null,
  status booking_status default 'PENDING'::booking_status not null,
  staff_assigned uuid references public.staff_profiles(id),
  payment_screenshot_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Expenses Core Table
CREATE TABLE public.expenses (
  id uuid default gen_random_uuid() primary key,
  submitted_by uuid references public.staff_profiles(id),
  amount numeric(10,2) not null,
  description text not null,
  bill_image_url text,
  date date default CURRENT_DATE not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Setup basic full-access policies to enable quick dashboard building
ALTER TABLE public.staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slot_capacity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow All Access" ON public.staff_profiles FOR ALL USING (true);
CREATE POLICY "Allow All Access" ON public.slot_capacity FOR ALL USING (true);
CREATE POLICY "Allow All Access" ON public.bookings FOR ALL USING (true);
CREATE POLICY "Allow All Access" ON public.expenses FOR ALL USING (true);
