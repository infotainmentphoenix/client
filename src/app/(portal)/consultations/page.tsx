'use client';

import { useState, useEffect, useMemo } from 'react';
import { consultationApi } from '@/features/consultations/api';
import { Consultation } from '@/features/consultations/types';

import { ConsultationsHeader } from '@/components/portal/consultations/ConsultationsHeader';
import { ConsultationsFilter } from '@/components/portal/consultations/ConsultationsFilter';
import { ConsultationsList } from '@/components/portal/consultations/ConsultationsList';
import { ConsultationNotesModal } from '@/components/portal/consultations/ConsultationNotesModal';
import { ScheduleConsultationModal } from '@/components/portal/consultations/ScheduleConsultationModal';

export default function PortalConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [activeNotesModal, setActiveNotesModal] = useState<Consultation | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await consultationApi.getConsultations();
      setConsultations(data);
      setIsLoading(false);
    };
    load();
  }, []);

  const filteredConsultations = useMemo(() => {
    if (activeFilter === 'ALL') return consultations;
    return consultations.filter(c => c.status === activeFilter);
  }, [consultations, activeFilter]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <ConsultationsHeader onSchedule={() => setShowScheduleModal(true)} />

      <ConsultationsFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        totalCount={consultations.length}
      />

      <ConsultationsList
        isLoading={isLoading}
        consultations={filteredConsultations}
        onViewNotes={setActiveNotesModal}
        onSchedule={() => setShowScheduleModal(true)}
      />

      <ConsultationNotesModal
        consultation={activeNotesModal}
        onClose={() => setActiveNotesModal(null)}
      />

      <ScheduleConsultationModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />
    </div>
  );
}
