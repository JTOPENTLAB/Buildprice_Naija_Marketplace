// app/page.tsx
"use client"
import { useEffect, useState } from "react"

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "https://buildprice-naija-backend.onrender.com"

type Price = { id:string, material:string, category:string, price:number, unit:string, location:string, supplier?:string, updated_at:string, change?:number }

const MOCK: Price[] = [
  {id:"1", material:"Dangote Cement 50kg", category:"Cement", price:8500, unit:"bag", location:"Lagos", supplier:"Alaba Int'l", updated_at:"2h ago", change:2.1},
  {id:"2", material:"6-inch Block", category:"Blocks", price:650, unit:"piece", location:"Abuja", supplier:"Kubwa Block", updated_at:"5h ago", change:-0.8},
  {id:"3", material:"Sharp Sand", category:"Sand", price:45000, unit:"trip", location:"Port Harcourt", supplier:"Rumuokoro", updated_at:"1h ago", change:1.2},
  // add 9 more...
]

export default function Home(){
  const [prices,setPrices]=useState<Price[]>(MOCK)
  const [q,setQ]=useState(""), [loc,setLoc]=useState("All"), [cat,setCat]=useState("All")

  useEffect(()=>{
    fetch(`${BACKEND}/api/prices`).then(r=>r.json()).then(d=>{ if(Array.isArray(d) && d.length) setPrices(d)}).catch(()=>{})
  },[])

  const filtered = prices.filter(p=> 
    (loc==="All"||p.location===loc) && 
    (cat==="All"||p.category===cat) && 
    p.material.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-white text-black p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight">HowMuchBuild — Marketplace</h1>
      <p className="mt-2 text-zinc-600">Live building material prices across Nigeria</p>
      
      <div className="mt-8 flex flex-wrap gap-3">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search cement, blocks, sand..." className="border rounded-lg px-4 py-2 w-72"/>
        <select value={loc} onChange={e=>setLoc(e.target.value)} className="border rounded-lg px-3 py-2"><option>All</option><option>Lagos</option><option>Abuja</option><option>Port Harcourt</option><option>Kano</option><option>Ibadan</option></select>
        <select value={cat} onChange={e=>setCat(e.target.value)} className="border rounded-lg px-3 py-2"><option>All</option><option>Cement</option><option>Blocks</option><option>Sand</option><option>Granite</option><option>Iron Rods</option></select>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map(p=>(
          <div key={p.id} className="border rounded-xl p-4 hover:shadow-md transition">
            <div className="flex justify-between"><span className="font-semibold">{p.material}</span><span className={`text-sm ${ (p.change||0)>=0?'text-green-600':'text-red-600'}`}>{p.change ? `${p.change>0?'+':''}${p.change}%` : ''}</span></div>
            <div className="mt-2 text-2xl font-bold">₦{p.price.toLocaleString()} <span className="text-sm font-normal text-zinc-500">/ {p.unit}</span></div>
            <div className="mt-1 text-sm text-zinc-600">{p.location} • {p.supplier} • {p.updated_at}</div>
          </div>
        ))}
      </div>

      <a href="/admin" className="mt-10 inline-block text-sm underline">Go to /admin →</a>
    </main>
  )
}
