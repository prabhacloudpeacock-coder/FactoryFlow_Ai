import { Router } from 'express';

const router = Router();

// Mock database for production orders
let productionOrders = [
  { id: 'po1', order_number: 'PO-2026-001', product_id: '1', quantity: 10, status: 'in-progress', start_date: '2026-04-01T08:00:00Z', end_date: null },
  { id: 'po2', order_number: 'PO-2026-002', product_id: '2', quantity: 5, status: 'pending', start_date: null, end_date: null }
];

let productionSteps = [
  { id: 'ps1', order_id: 'po1', step_id: 's1', status: 'completed', started_at: '2026-04-01T09:00:00Z', completed_at: '2026-04-01T10:00:00Z', operator_id: 'u1', notes: 'Frame assembled successfully' },
  { id: 'ps2', order_id: 'po1', step_id: 's2', status: 'in-progress', started_at: '2026-04-01T10:30:00Z', completed_at: null, operator_id: 'u2', notes: 'Motor installation in progress' }
];

// GET /api/production
router.get('/', (req, res) => {
  res.json(productionOrders);
});

// GET /api/production/:id
router.get('/:id', (req, res) => {
  const order = productionOrders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Production order not found' });
  
  const steps = productionSteps.filter(s => s.order_id === req.params.id);
  res.json({ ...order, steps });
});

// POST /api/production
router.post('/', (req, res) => {
  const newOrder = { id: Date.now().toString(), ...req.body };
  productionOrders.push(newOrder);
  res.status(201).json(newOrder);
});

// PATCH /api/production/step/:id
router.patch('/step/:id', (req, res) => {
  const index = productionSteps.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Production step not found' });
  productionSteps[index] = { ...productionSteps[index], ...req.body };
  res.json(productionSteps[index]);
});

export default router;
