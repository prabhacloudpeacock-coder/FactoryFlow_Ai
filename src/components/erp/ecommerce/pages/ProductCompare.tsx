import { useState } from 'react';
import { GitCompare, Check, X } from 'lucide-react';
import { clsx } from 'clsx';

const PRODUCTS = [
  {
    id: 'EV-BIKE-MODEL-S',
    name: 'EV Bike Model S',
    price: 2499,
    specs: {
      range: '120 km',
      topSpeed: '45 km/h',
      motor: '750W Hub Motor',
      battery: '48V 15Ah Lithium-ion',
      weight: '22 kg',
      suspension: 'Front Fork',
      brakes: 'Hydraulic Disc',
      warranty: '2 Years',
    }
  },
  {
    id: 'EV-BIKE-MODEL-X',
    name: 'EV Bike Model X',
    price: 3299,
    specs: {
      range: '90 km',
      topSpeed: '55 km/h',
      motor: '1000W Mid-Drive',
      battery: '52V 17.5Ah Lithium-ion',
      weight: '26 kg',
      suspension: 'Full Suspension',
      brakes: '4-Piston Hydraulic',
      warranty: '3 Years',
    }
  },
  {
    id: 'EV-BIKE-CITY-LITE',
    name: 'EV Bike City Lite',
    price: 1499,
    specs: {
      range: '60 km',
      topSpeed: '25 km/h',
      motor: '250W Hub Motor',
      battery: '36V 10Ah Lithium-ion',
      weight: '16 kg',
      suspension: 'Rigid',
      brakes: 'Mechanical Disc',
      warranty: '1 Year',
    }
  },
  {
    id: 'EV-BIKE-CARGO-PRO',
    name: 'EV Bike Cargo Pro',
    price: 3999,
    specs: {
      range: '150 km',
      topSpeed: '35 km/h',
      motor: '750W Dual Motor',
      battery: '48V 25Ah Dual Battery',
      weight: '35 kg',
      suspension: 'Front Fork Heavy Duty',
      brakes: 'Hydraulic Disc',
      warranty: '2 Years',
    }
  }
];

export default function ProductCompare() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['EV-BIKE-MODEL-S', 'EV-BIKE-MODEL-X']);

  const toggleProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(p => p !== id));
    } else {
      if (selectedProducts.length < 3) {
        setSelectedProducts([...selectedProducts, id]);
      }
    }
  };

  const specKeys = Object.keys(PRODUCTS[0].specs) as Array<keyof typeof PRODUCTS[0]['specs']>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <GitCompare className="text-orange-500" size={20} /> Compare Models
          </h2>
          <p className="text-sm text-zinc-500">Select up to 3 models to compare specifications side-by-side.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {PRODUCTS.map(product => {
          const isSelected = selectedProducts.includes(product.id);
          return (
            <button
              key={product.id}
              onClick={() => toggleProduct(product.id)}
              disabled={!isSelected && selectedProducts.length >= 3}
              className={clsx(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all border flex items-center gap-2",
                isSelected 
                  ? "bg-orange-500/10 border-orange-500/50 text-orange-500" 
                  : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700",
                !isSelected && selectedProducts.length >= 3 && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSelected ? <Check size={16} /> : <div className="w-4 h-4 rounded-full border border-zinc-600" />}
              {product.name}
            </button>
          );
        })}
      </div>

      {selectedProducts.length > 0 ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="p-4 border-b border-zinc-800 bg-zinc-900/50 w-48">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Specification</span>
                </th>
                {selectedProducts.map(id => {
                  const product = PRODUCTS.find(p => p.id === id)!;
                  return (
                    <th key={id} className="p-4 border-b border-zinc-800 bg-zinc-900/50 min-w-[200px]">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-zinc-100">{product.name}</h3>
                          <p className="text-orange-500 font-bold">${product.price}</p>
                        </div>
                        <button 
                          onClick={() => toggleProduct(id)}
                          className="p-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-sm">
              {specKeys.map((key, index) => (
                <tr key={key} className={index % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900/30'}>
                  <td className="p-4 border-b border-zinc-800/50 text-zinc-400 capitalize font-medium">
                    {key}
                  </td>
                  {selectedProducts.map(id => {
                    const product = PRODUCTS.find(p => p.id === id)!;
                    return (
                      <td key={`${id}-${key}`} className="p-4 border-b border-zinc-800/50 text-zinc-100 font-mono text-xs">
                        {product.specs[key]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-zinc-950 border border-dashed border-zinc-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-600">
            <GitCompare size={32} />
          </div>
          <p className="text-zinc-500">Select at least one product to view specifications.</p>
        </div>
      )}
    </div>
  );
}
