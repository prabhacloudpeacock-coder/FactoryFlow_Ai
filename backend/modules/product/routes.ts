import { Router } from 'express';

const router = Router();

// Mock database for now (to be replaced with actual DB calls)
let products = [
  { id: '1', name: 'EV Bike', sku: 'EVB-001', description: 'Electric Bike Model A', category: 'EV' },
  { id: '2', name: 'EV Scooter', sku: 'EVS-001', description: 'Electric Scooter Model B', category: 'EV' }
];

let bom = [
  { id: '1', product_id: '1', part_id: 'p1', quantity: 1, name: 'Battery Pack' },
  { id: '2', product_id: '1', part_id: 'p2', quantity: 1, name: 'Traction Motor' },
  { id: '3', product_id: '1', part_id: 'p3', quantity: 2, name: 'Tires' }
];

// GET /api/products
router.get('/', (req, res) => {
  res.json(products);
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  
  const productBOM = bom.filter(b => b.product_id === req.params.id);
  res.json({ ...product, bom: productBOM });
});

// POST /api/products
router.post('/', (req, res) => {
  const newProduct = { id: Date.now().toString(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

export default router;
