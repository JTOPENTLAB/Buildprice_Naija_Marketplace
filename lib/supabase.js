import { createClient } from '@supabase/supabase-js';

// Create the client lazily so builds without Supabase env vars don't crash at import time.
let client;
function getClient() {
  if (!client) {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  }
  return client;
}

export const supabase = new Proxy({}, {
  get(_target, prop) {
    const value = getClient()[prop];
    return typeof value === 'function' ? value.bind(getClient()) : value;
  },
});
