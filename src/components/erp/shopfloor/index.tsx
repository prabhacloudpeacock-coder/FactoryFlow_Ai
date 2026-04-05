import { useState } from 'react';
import Login from './pages/Login';
import JobList from './pages/JobList';
import JobControl from './pages/JobControl';
import MachineSelection from './pages/MachineSelection';
import ProductionEntry from './pages/ProductionEntry';
import DefectEntry from './pages/DefectEntry';
import DowntimeEntry from './pages/DowntimeEntry';
import ShiftHandover from './pages/ShiftHandover';
import MachineTelemetry from './pages/MachineTelemetry';

export default function ShopFloorControl() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Shop Floor Control</h1>
      
      {!selectedJob ? (
        <JobList onSelect={setSelectedJob} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <JobControl job={selectedJob} />
            <MachineTelemetry />
            <MachineSelection />
            <ProductionEntry />
          </div>
          <div className="space-y-6">
            <DefectEntry />
            <DowntimeEntry />
            <ShiftHandover />
            <button onClick={() => setSelectedJob(null)} className="text-zinc-500 underline">Back to Jobs</button>
          </div>
        </div>
      )}
    </div>
  );
}

