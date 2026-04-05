import { Router } from 'express';

const router = Router();

// Mock database for workflows
let workflows = [
  {
    id: 'w1',
    product_id: '1',
    name: 'EV Bike Assembly Process',
    steps: [
      { id: 's1', step_name: 'Frame Assembly', machine_id: 'M1', sequence_order: 1, estimated_duration_minutes: 45, operator_role: 'Assembler' },
      { id: 's2', step_name: 'Motor Install', machine_id: 'M2', sequence_order: 2, estimated_duration_minutes: 30, operator_role: 'Technician' },
      { id: 's3', step_name: 'Battery Integration', machine_id: 'M3', sequence_order: 3, estimated_duration_minutes: 60, operator_role: 'Electrician' },
      { id: 's4', step_name: 'QC Testing', machine_id: 'QC1', sequence_order: 4, estimated_duration_minutes: 20, operator_role: 'QC Inspector' }
    ]
  }
];

// GET /api/workflow/:product_id
router.get('/:product_id', (req, res) => {
  const workflow = workflows.find(w => w.product_id === req.params.product_id);
  if (!workflow) return res.status(404).json({ error: 'Workflow not found for this product' });
  res.json(workflow);
});

// POST /api/workflow
router.post('/', (req, res) => {
  const newWorkflow = { id: Date.now().toString(), ...req.body };
  workflows.push(newWorkflow);
  res.status(201).json(newWorkflow);
});

// PUT /api/workflow/:id
router.put('/:id', (req, res) => {
  const index = workflows.findIndex(w => w.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Workflow not found' });
  workflows[index] = { ...workflows[index], ...req.body };
  res.json(workflows[index]);
});

export default router;
