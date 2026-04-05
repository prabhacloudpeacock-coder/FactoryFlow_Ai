import { Router } from 'express';

const router = Router();

// Mock database for inventory
let inventory = [
  { id: 'i1', part_id: 'p1', name: 'Battery Pack', quantity: 50, min_stock_level: 10, location: 'Shelf A1' },
  { id: 'i2', part_id: 'p2', name: 'Traction Motor', quantity: 20, min_stock_level: 5, location: 'Shelf B2' },
  { id: 'i3', part_id: 'p3', name: 'Tires', quantity: 200, min_stock_level: 40, location: 'Shelf C3' }
];

// GET /api/inventory
router.get('/', (req, res) => {
  res.json(inventory);
});

// GET /api/inventory/:part_id
router.get('/:part_id', (req, res) => {
  const item = inventory.find(i => i.part_id === req.params.part_id);
  if (!item) return res.status(404).json({ error: 'Inventory item not found' });
  res.json(item);
});

// POST /api/inventory/update
router.post('/update', (req, res) => {
  const { part_id, quantity_change } = req.body;
  const item = inventory.find(i => i.part_id === part_id);
  if (!item) return res.status(404).json({ error: 'Inventory item not found' });
  
  item.quantity += quantity_change;
  res.json(item);
});

export default router;
