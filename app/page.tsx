// app/page.tsx
import Link from "next/link";

async function getPrices() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "https://buildprice-naija-backend.onrender.com"}/api/prices`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return await res.json();
  } catch { return []; }
}

export default async function Home() {
  const prices = await getPrices();
  const data = Array.isArray(prices) ? prices : prices.data || [];

  return (
    <main className="min-h-screen bg-zinc-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-black">HowMuchBuild — Marketplace</h1>
          <Link href="/admin" className="text-sm font-medium underline">Go to /admin</Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-4xl font-bold tracking-tight">Know the price before you build.</h2>
        <p className="mt-3 text-zinc-600 max-w-xl">Live prices for cement, blocks, iron rods, roofing sheets across Nigeria. Updated daily from suppliers.</p>
        
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {["Cement","Blocks","Iron Rods","Roofing","Sand & Granite","Paints"].map(c=>(
            <div key={c} className="rounded-2xl bg-white p-5 border shadow-sm">
              <p className="font-semibold">{c}</p>
              <p className="text-sm text-zinc-500 mt-1">See latest {c.toLowerCase()} prices</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl border">
          <div className="p-5 border-b flex justify-between">
            <h3 className="font-semibold">Latest Prices</h3>
            <span className="text-xs text-zinc-500">{data.length} items</span>
          </div>
          <div className="divide-y">
            {data.length === 0 ? (
              <p className="p-6 text-sm text-zinc-500">No prices yet — check /api/prices or your backend on Render.</p>
            ) : data.slice(0,20).map((p:any, i:number)=>(
              <div key={i} className="p-4 flex justify-between text-sm">
                <span>{p.name || p.material || "Item"}</span>
                <span className="font-medium">₦{p.price || p.amount || "—"}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
