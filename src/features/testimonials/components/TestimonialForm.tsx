'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { testimonialApi } from '../api';
import { Testimonial } from '../types';

interface TestimonialFormProps {
  eventId?: string | number;
}

export function TestimonialForm({ eventId }: TestimonialFormProps) {
  const router = useRouter();
  const isEditing = !!eventId;
  const [isLoading, setIsLoading] = useState(false);
  
  const [availableEvents, setAvailableEvents] = useState<{id: number, title: string, clientName: string}[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | ''>(isEditing ? Number(eventId) : '');
  
  const [formData, setFormData] = useState({
    clientName: '',
    clientQuote: '',
  });

  useEffect(() => {
    if (isEditing) {
      loadTestimonial();
    } else {
      loadAvailableEvents();
    }
  }, [eventId]);

  const loadTestimonial = async () => {
    setIsLoading(true);
    const data = await testimonialApi.getTestimonial(eventId!);
    if (data) {
      setFormData({
        clientName: data.clientName || '',
        clientQuote: data.clientQuote || '',
      });
      setSelectedEventId(data.eventId || data.id);
      setAvailableEvents([{ id: data.eventId || data.id, title: data.eventTitle, clientName: data.clientName }]);
    }
    setIsLoading(false);
  };

  const loadAvailableEvents = async () => {
    setIsLoading(true);
    const events = await testimonialApi.getAvailableEvents();
    setAvailableEvents(events);
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    setSelectedEventId(selectedId);
    
    // Auto-fill client name if the event already has one recorded
    const event = availableEvents.find(ev => ev.id === selectedId);
    if (event && event.clientName && !formData.clientName) {
      setFormData(prev => ({ ...prev, clientName: event.clientName }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId) {
      alert('Please select an event to attach this testimonial to.');
      return;
    }
    
    setIsLoading(true);

    // Save testimonial actually updates the Event record
    const result = await testimonialApi.saveTestimonial(selectedEventId, formData);

    setIsLoading(false);
    
    if (result) {
      router.push('/admin/content/testimonials');
    } else {
      alert('Failed to save testimonial. Check console for details.');
    }
  };

  if (isLoading && isEditing) {
    return <div className="p-8 text-center text-gray-500">Loading testimonial data...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
        <h3 className="text-lg font-bold mb-6 border-b border-border pb-4">Testimonial Details</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Related Event *</label>
            <select 
              required
              disabled={isEditing}
              value={selectedEventId} 
              onChange={handleEventChange}
              className={`w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'opacity-70 bg-gray-50' : ''}`}
            >
              <option value="" disabled>Select an Event</option>
              {availableEvents.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title} {event.clientName ? `(Client: ${event.clientName})` : ''}
                </option>
              ))}
            </select>
            {!isEditing && availableEvents.length === 0 && !isLoading && (
              <p className="text-xs text-amber-500 mt-2">All events currently have quotes or no events exist. You need to create an event first.</p>
            )}
            {isEditing && (
              <p className="text-xs text-gray-500 mt-2">You cannot change the event a testimonial is attached to. Edit the event directly instead.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Client Name *</label>
            <input 
              required
              type="text" 
              name="clientName" 
              value={formData.clientName} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. John Doe, CEO of TechCorp"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Client Quote / Testimonial *</label>
            <textarea 
              required
              name="clientQuote" 
              rows={6}
              value={formData.clientQuote} 
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What did the client say about the event..."
            />
            <p className="text-xs text-gray-500 mt-2">
              Note: The testimonial relies on the event's cover image. To change the display picture, update the related Event's cover image.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 sticky bottom-0 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-lg">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="px-6 py-2 border border-border rounded-lg text-sm font-medium hover:bg-foreground/5 transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isLoading || (!selectedEventId && !isEditing)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : (isEditing ? 'Update Testimonial' : 'Save Testimonial')}
        </button>
      </div>
    </form>
  );
}
