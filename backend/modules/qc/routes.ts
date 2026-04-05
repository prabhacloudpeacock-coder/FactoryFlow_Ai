import { Router } from 'express';

const router = Router();

// Mock database for QC reports
let qcReports = [
  { id: 'qc1', order_id: 'po1', step_id: 'ps1', status: 'pass', defect_type: null, notes: 'Frame assembly QC passed', images: [], created_at: '2026-04-01T10:15:00Z' },
  { id: 'qc2', order_id: 'po1', step_id: 'ps2', status: 'fail', defect_type: 'Alignment', notes: 'Motor alignment slightly off', images: [], created_at: '2026-04-01T11:00:00Z' }
];

// GET /api/qc
router.get('/', (req, res) => {
  res.json(qcReports);
});

// GET /api/qc/:order_id
router.get('/:order_id', (req, res) => {
  const reports = qcReports.filter(r => r.order_id === req.params.order_id);
  res.json(reports);
});

// POST /api/qc
router.post('/', (req, res) => {
  const newReport = { id: Date.now().toString(), ...req.body };
  qcReports.push(newReport);
  res.status(201).json(newReport);
});

export default router;
