import { useState } from 'react';
import { Search, Filter, ShoppingCart, Plus, Star } from 'lucide-react';
import { clsx } from 'clsx';

const PRODUCTS = [
  {
    id: 'EV-BIKE-MODEL-S',
    name: 'EV Bike Model S',
    category: 'Bikes',
    description: 'High-performance urban commuter with extended range.',
    price: 2499,
    range: '120 km',
    topSpeed: '45 km/h',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
  },
  {
    id: 'EV-BIKE-MODEL-X',
    name: 'EV Bike Model X',
    category: 'Bikes',
    description: 'All-terrain electric mountain bike with dual suspension.',
    price: 3299,
    range: '90 km',
    topSpeed: '55 km/h',
    image: 'https://images.unsplash.com/photo-1572334005187-b6f72c3d0016?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
  },
  {
    id: 'EV-BIKE-CITY-LITE',
    name: 'EV Bike City Lite',
    category: 'Bikes',
    description: 'Lightweight, foldable electric bike for easy storage.',
    price: 1499,
    range: '60 km',
    topSpeed: '25 km/h',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
  },
  {
    id: 'EV-BIKE-CARGO-PRO',
    name: 'EV Bike Cargo Pro',
    category: 'Bikes',
    description: 'Heavy-duty cargo bike for delivery and logistics.',
    price: 3999,
    range: '150 km',
    topSpeed: '35 km/h',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
  },
  {
    id: 'PART-HUB-MOTOR-750',
    name: '750W Hub Motor',
    category: 'Parts',
    description: 'High-torque brushless rear hub motor for Model S.',
    price: 350,
    range: 'N/A',
    topSpeed: 'N/A',
    image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
  },
  {
    id: 'PART-BATTERY-48V',
    name: '48V 15Ah Lithium-ion Battery',
    category: 'Parts',
    description: 'Replacement battery pack with integrated BMS.',
    price: 450,
    range: 'N/A',
    topSpeed: 'N/A',
    image: 'https://images.unsplash.com/photo-1620802051782-726887556a31?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
  },
  {
    id: 'PART-FRAME-ALLOY',
    name: 'Aluminum Alloy Frame Type-S',
    category: 'Parts',
    description: 'Lightweight aerospace-grade aluminum frame.',
    price: 280,
    range: 'N/A',
    topSpeed: 'N/A',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
  },
  {
    id: 'PART-BRAKES-HYD',
    name: 'Hydraulic Disc Brake Set',
    category: 'Parts',
    description: 'Complete front and rear hydraulic brake assembly.',
    price: 120,
    range: 'N/A',
    topSpeed: 'N/A',
    image: 'https://images.unsplash.com/photo-1572334005187-b6f72c3d0016?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
  }
];

export default function Storefront() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Product Catalog</h2>
          <p className="text-sm text-zinc-500">Browse and order EV bikes and parts directly from the factory.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-colors">
            <ShoppingCart size={16} /> Cart (0)
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Bikes', 'Parts'].map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={clsx(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              activeCategory === category 
                ? "bg-zinc-100 text-zinc-900" 
                : "bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col group hover:border-zinc-700 transition-all">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-zinc-800">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-zinc-100">{product.rating}</span>
              </div>
              <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2 py-1 rounded-lg border border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">{product.category}</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-zinc-100">{product.name}</h3>
                <span className="font-bold text-orange-500">${product.price}</span>
              </div>
              <p className="text-xs text-zinc-400 mb-4 flex-1">{product.description}</p>
              
              {product.category === 'Bikes' && (
                <div className="flex items-center gap-4 mb-4 text-xs text-zinc-500">
                  <div className="bg-zinc-900 px-2 py-1 rounded border border-zinc-800">Range: {product.range}</div>
                  <div className="bg-zinc-900 px-2 py-1 rounded border border-zinc-800">Speed: {product.topSpeed}</div>
                </div>
              )}

              <button className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors mt-auto">
                <Plus size={16} /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
