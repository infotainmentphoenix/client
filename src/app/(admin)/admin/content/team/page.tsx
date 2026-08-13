import React from 'react';
import { TeamList } from '@/features/team/components/TeamList';

export default function AdminTeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Team Members</h1>
        <p className="text-gray-500">Manage internal team members and dashboard administrators.</p>
      </div>

      <TeamList />
    </div>
  );
}
