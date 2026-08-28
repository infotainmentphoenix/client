import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { inquiryApi } from '../api';
import { Inquiry, InquiryStatus, InquiryPriority, LeadActivityType } from '../types';

interface InquiryDetailProps {
  inquiryId: string | number;
}

export function InquiryDetail({ inquiryId }: InquiryDetailProps) {
  const router = useRouter();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [activityFormData, setActivityFormData] = useState({
    type: 'NOTE' as LeadActivityType,
    title: '',
    notes: ''
  });
  
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [localLeadScore, setLocalLeadScore] = useState<number | null>(null);

  useEffect(() => {
    loadInquiry();
  }, [inquiryId]);

  useEffect(() => {
    if (inquiry) {
      setLocalLeadScore(inquiry.leadScore ?? 0);
    }
  }, [inquiry?.id, inquiry?.leadScore]);

  async function loadInquiry() {
    setIsLoading(true);
    const data = await inquiryApi.getInquiry(inquiryId);
    setInquiry(data);
    setIsLoading(false);
  };

  const saveLeadScore = async (score: number) => {
    if (!inquiry) return;
    const cleanScore = Math.min(100, Math.max(0, score));
    const success = await inquiryApi.updateInquiry(inquiry.id, { leadScore: cleanScore });
    if (success) {
      setInquiry({ ...inquiry, leadScore: cleanScore });
    } else {
      setLocalLeadScore(inquiry.leadScore ?? 0);
      alert('Failed to update lead score.');
    }
  };

  async function handleStatusChange(status: InquiryStatus) {
    if (!inquiry) return;
    const success = await inquiryApi.updateInquiry(inquiry.id, { status });
    if (success) {
      setInquiry({ ...inquiry, status });
    }
  };

  async function handlePriorityChange(priority: InquiryPriority) {
    if (!inquiry) return;
    const success = await inquiryApi.updateInquiry(inquiry.id, { priority });
    if (success) {
      setInquiry({ ...inquiry, priority });
    }
  };

  async function handleActivitySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inquiry) return;
    
    setIsSaving(true);
    const success = await inquiryApi.addLeadActivity(inquiry.id, activityFormData);
    if (success) {
      setActivityFormData({ type: 'NOTE', title: '', notes: '' });
      setIsAddingActivity(false);
      loadInquiry(); // Reload to get new activities
    } else {
      alert('Failed to add activity.');
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return <div className="p-12 text-center text-gray-500">Loading inquiry details...</div>;
  }

  if (!inquiry) {
    return <div className="p-12 text-center text-red-500">Inquiry not found.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
      {/* Left Column - Details */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Client & Event Details */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Inquiry Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Client Name</p>
              <p className="font-semibold text-foreground">{inquiry.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Company</p>
              <p className="font-semibold text-foreground">{inquiry.company || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <a href={`mailto:${inquiry.email}`} className="font-semibold text-blue-600 hover:underline">{inquiry.email}</a>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="font-semibold text-foreground">{inquiry.phone || 'N/A'}</p>
            </div>
            
            <div className="col-span-1 md:col-span-2 my-4 border-t border-border"></div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Event Type</p>
              <p className="font-semibold text-foreground">{inquiry.eventType?.replace('_', ' ') || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Event Date</p>
              <p className="font-semibold text-foreground">{inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Venue / City</p>
              <p className="font-semibold text-foreground">
                {inquiry.venue ? `${inquiry.venue}` : ''}
                {inquiry.venue && inquiry.city ? ', ' : ''}
                {inquiry.city ? `${inquiry.city}` : ''}
                {!inquiry.venue && !inquiry.city ? 'N/A' : ''}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Guest Count</p>
              <p className="font-semibold text-foreground">{inquiry.guestCount || 'N/A'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Budget ({inquiry.currency})</p>
              <p className="font-semibold text-foreground">
                {inquiry.budgetMin ? `${inquiry.budgetMin}` : ''} 
                {inquiry.budgetMax ? ` - ${inquiry.budgetMax}` : ''}
                {!inquiry.budgetMin && !inquiry.budgetMax ? 'Unspecified' : ''}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Source</p>
              <p className="font-semibold text-foreground">{inquiry.source?.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        {}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Message & Requirements</h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Message</p>
              <div className="p-4 bg-background rounded-lg border border-border text-sm whitespace-pre-wrap">
                {inquiry.message || 'No message provided.'}
              </div>
            </div>
            
            {inquiry.requirements && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Specific Requirements</p>
                <div className="p-4 bg-background rounded-lg border border-border text-sm whitespace-pre-wrap">
                  {inquiry.requirements}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {}
      <div className="space-y-6">
        
        {}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Manage Lead</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Lead Status</label>
              <select 
                value={inquiry.status}
                onChange={(e) => handleStatusChange(e.target.value as InquiryStatus)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="PROPOSAL_SENT">Proposal Sent</option>
                <option value="NEGOTIATION">Negotiation</option>
                <option value="WON">Won</option>
                <option value="LOST">Lost</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
              <select 
                value={inquiry.priority}
                onChange={(e) => handlePriorityChange(e.target.value as InquiryPriority)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>

            {localLeadScore !== null && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-foreground">Lead Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={localLeadScore}
                    onChange={(e) => setLocalLeadScore(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                    onBlur={() => saveLeadScore(localLeadScore)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        saveLeadScore(localLeadScore);
                      }
                    }}
                    className="w-16 px-2 py-0.5 text-xs text-right bg-background border border-border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={localLeadScore}
                    onChange={(e) => setLocalLeadScore(parseInt(e.target.value) || 0)}
                    onMouseUp={() => saveLeadScore(localLeadScore)}
                    onTouchEnd={() => saveLeadScore(localLeadScore)}
                    className="flex-grow h-1.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <span className={`text-xs font-bold w-8 text-right ${localLeadScore > 70 ? 'text-green-500' : localLeadScore > 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {localLeadScore}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
            <h3 className="text-lg font-bold">Activity Timeline</h3>
            <button 
              onClick={() => setIsAddingActivity(!isAddingActivity)}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-md"
            >
              {isAddingActivity ? 'Cancel' : '+ Add Activity'}
            </button>
          </div>

          {isAddingActivity && (
            <form onSubmit={handleActivitySubmit} className="mb-6 p-4 bg-background border border-border rounded-xl space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Type</label>
                <select 
                  value={activityFormData.type}
                  onChange={(e) => setActivityFormData({...activityFormData, type: e.target.value as LeadActivityType})}
                  className="w-full px-3 py-1.5 bg-card border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="NOTE">Note</option>
                  <option value="CALL">Call</option>
                  <option value="EMAIL_SENT">Email Sent</option>
                  <option value="WHATSAPP_SENT">WhatsApp Sent</option>
                  <option value="MEETING">Meeting</option>
                  <option value="PROPOSAL">Proposal</option>
                  <option value="FOLLOW_UP">Follow Up</option>
                  <option value="STATUS_CHANGE">Status Change</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Title</label>
                <input 
                  required
                  type="text" 
                  value={activityFormData.title}
                  onChange={(e) => setActivityFormData({...activityFormData, title: e.target.value})}
                  className="w-full px-3 py-1.5 bg-card border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. Sent pricing catalog"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Notes</label>
                <textarea 
                  value={activityFormData.notes}
                  onChange={(e) => setActivityFormData({...activityFormData, notes: e.target.value})}
                  className="w-full px-3 py-1.5 bg-card border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={2}
                />
              </div>
              <button 
                type="submit"
                disabled={isSaving}
                className="w-full py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Activity'}
              </button>
            </form>
          )}

          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {(!inquiry.activities || inquiry.activities.length === 0) ? (
              <div className="text-sm text-center text-gray-500 py-4 relative z-10">
                No activities logged yet.
              </div>
            ) : (
              inquiry.activities.map((activity, index) => (
                <div key={activity.id} className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">
                        {activity.type === 'CALL' ? '📞' : activity.type === 'MEETING' ? '🤝' : activity.type === 'EMAIL_SENT' ? '✉️' : '📝'}
                      </span>
                    </div>
                    <div className="flex-1 bg-background border border-border rounded-xl p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-sm">{activity.title}</h4>
                        <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2">
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {activity.notes && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 whitespace-pre-wrap">
                          {activity.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
