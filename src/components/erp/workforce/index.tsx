import { useState } from 'react';
import PageTabMenu from '../../common/PageTabMenu';
import { Users, Calendar, Fingerprint, Star, Activity, Clock } from 'lucide-react';
import ShiftPlanning from './pages/ShiftPlanning';
import Attendance from './pages/Attendance';
import SkillMatrix from './pages/SkillMatrix';
import ProductivityTracking from './pages/Productivity';

export default function Workforce() {
  const [activeTab, setActiveTab] = useState('shifts');

  const tabs = [
    { id: 'shifts', label: 'Shift Planning', icon: Calendar, component: <ShiftPlanning /> },
    { id: 'attendance', label: 'Attendance', icon: Fingerprint, component: <Attendance /> },
    { id: 'skills', label: 'Skill Matrix', icon: Star, component: <SkillMatrix /> },
    { id: 'productivity', label: 'Productivity', icon: Activity, component: <ProductivityTracking /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Workforce Management</h1>
        <PageTabMenu tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl min-h-[600px]">
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
}

