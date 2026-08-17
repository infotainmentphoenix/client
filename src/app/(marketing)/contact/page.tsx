'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api/client';
import { serviceApi } from '@/features/services/api';
import { Service } from '@/features/services/types';
import { DatePicker } from '@/components/ui/DatePicker';


const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const ClockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const SendIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);
const LoaderIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
);

const EVENT_TYPES = [
  { value: 'CORPORATE', label: 'Corporate Event' },
  { value: 'WEDDING', label: 'Wedding' },
  { value: 'CONCERT', label: 'Concert' },
  { value: 'FESTIVAL', label: 'Festival' },
  { value: 'PRODUCT_LAUNCH', label: 'Product Launch' },
  { value: 'PRIVATE_PARTY', label: 'Private Party' },
  { value: 'AWARDS_CEREMONY', label: 'Awards Ceremony' },
  { value: 'ENTERTAINMENT', label: 'Entertainment Show' },
  { value: 'OTHER', label: 'Other' },
];

const BUDGET_RANGES = [
  { label: 'Under ₹5 Lakhs', min: 0, max: 500000 },
  { label: '₹5 - 15 Lakhs', min: 500000, max: 1500000 },
  { label: '₹15 - 50 Lakhs', min: 1500000, max: 5000000 },
  { label: '₹50 Lakhs - 1 Crore', min: 5000000, max: 10000000 },
  { label: 'Above ₹1 Crore', min: 10000000, max: 99999999 },
];

function ContactForm() {
  const searchParams = useSearchParams();

  
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState<string>('');
  const [eventType, setEventType] = useState<string>('');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [city, setCity] = useState('');
  const [budgetIndex, setBudgetIndex] = useState<string>('');
  const [message, setMessage] = useState('');

  // Status States
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Client-side field-level validation rules
  const validateField = (fieldName: string, value: string) => {
    let errorMsg = '';
    switch (fieldName) {
      case 'name': {
        const trimmed = value.trim();
        if (!trimmed) errorMsg = 'Name is required';
        else if (trimmed.length < 3) errorMsg = 'Name must be at least 3 characters';
        else if (trimmed.length > 50) errorMsg = 'Name must be at most 50 characters';
        else if (!/^[a-zA-Z\s]+$/.test(trimmed)) errorMsg = 'Name can only contain letters and spaces';
        break;
      }
      case 'email': {
        const trimmed = value.trim();
        if (!trimmed) errorMsg = 'Email is required';
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) errorMsg = 'Invalid email address format';
        break;
      }
      case 'phone': {
        const trimmed = value.trim();
        if (trimmed && !/^\d{10}$/.test(trimmed)) errorMsg = 'Phone number must be exactly 10 digits';
        break;
      }
      case 'guestCount': {
        if (value !== '') {
          const num = Number(value);
          if (isNaN(num) || !Number.isInteger(num)) errorMsg = 'Guest count must be an integer';
          else if (num <= 0) errorMsg = 'Guest count must be a positive number';
        }
        break;
      }
      case 'city': {
        if (value && value.trim().length > 100) errorMsg = 'City name must be at most 100 characters';
        break;
      }
      case 'message': {
        if (value && value.trim().length > 1000) errorMsg = 'Message must be at most 1000 characters';
        break;
      }
      default: break;
    }
    return errorMsg;
  };

  const handleFieldChange = (field: string, value: string) => {
    if (field === 'name') setName(value);
    if (field === 'email') setEmail(value);
    if (field === 'phone') setPhone(value);
    if (field === 'eventDate') setEventDate(value);
    if (field === 'guestCount') setGuestCount(value);
    if (field === 'city') setCity(value);
    if (field === 'message') setMessage(value);

    if (touched[field]) {
      const err = validateField(field, value);
      setValidationErrors(prev => {
        const next = { ...prev };
        if (err) next[field] = err; else delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validateField(field, value);
    setValidationErrors(prev => {
      const next = { ...prev };
      if (err) next[field] = err; else delete next[field];
      return next;
    });
  };

  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetched = await serviceApi.getServices();
        const active = fetched.filter(s => s.isActive);
        setServices(active);
        const serviceSlug = searchParams.get('service');
        if (serviceSlug) {
          const matching = active.find(s => s.slug === serviceSlug);
          if (matching) setServiceId(String(matching.id));
        }
      } catch (err) { console.error('Failed to load services:', err); }
      finally { setIsLoadingServices(false); }
    };
    fetchServices();

    const eventTypeParam = searchParams.get('eventType');
    if (eventTypeParam) {
      const match = EVENT_TYPES.find(t => t.value === eventTypeParam.toUpperCase());
      if (match) setEventType(match.value);
    }

    const artistName = searchParams.get('artist');
    const packageName = searchParams.get('package');
    if (artistName) setMessage(`Hello, I would like to inquire about booking the artist: ${artistName} for my upcoming event.`);
    else if (packageName) setMessage(`Hello, I am interested in inquiring about the package "${packageName}".`);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allFields = { name, email, phone, guestCount, city, message };
    const nextTouched: Record<string, boolean> = {};
    const fieldErrors: Record<string, string> = {};

    Object.entries(allFields).forEach(([field, value]) => {
      nextTouched[field] = true;
      const err = validateField(field, value);
      if (err) fieldErrors[field] = err;
    });

    setTouched(nextTouched);
    setValidationErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      setError('Please correct the validation errors in the form.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let budgetMin: number | null = null;
      let budgetMax: number | null = null;
      if (budgetIndex !== '') {
        const selected = BUDGET_RANGES[Number(budgetIndex)];
        if (selected) { budgetMin = selected.min; budgetMax = selected.max; }
      }

      let requirements = '';
      const artist = searchParams.get('artist');
      const pkg = searchParams.get('package');
      if (artist) requirements = `Artist Inquiry: ${artist}`;
      else if (pkg) requirements = `Package Inquiry: ${pkg}`;

      const payload = { name, email, phone: phone || null, serviceId: serviceId ? Number(serviceId) : null, eventType: eventType || null, eventDate: eventDate || null, guestCount: guestCount ? Number(guestCount) : null, city: city || null, budgetMin, budgetMax, message: message || null, requirements: requirements || null, source: 'WEBSITE_FORM' };

      await api.post('/api/inquiries', payload);
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error submitting inquiry:', err);
      setError(err.message || 'An error occurred while submitting your message.');
      if (err.errors) {
        const backendErrors: Record<string, string> = {};
        Object.keys(err.errors).forEach((key) => {
          if (err.errors[key]?._errors?.[0]) backendErrors[key] = err.errors[key]._errors[0];
        });
        setValidationErrors(backendErrors);
      }
    } finally { setIsLoading(false); }
  };

  const handleReset = () => {
    setIsSuccess(false); setName(''); setEmail(''); setPhone(''); setServiceId(''); setEventType(''); setEventDate(''); setGuestCount(''); setCity(''); setBudgetIndex(''); setMessage(''); setError(null); setValidationErrors({}); setTouched({});
  };

  return (
    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
      {isSuccess ? (
        <div className="text-center py-12">
          <div className="relative inline-block mb-6">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent Successfully!</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
            Thank you for reaching out. An event coordinator from our team will get in touch with you shortly.
          </p>
          <button onClick={handleReset} className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline">
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 flex items-start gap-3 shadow-inner">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <div><h4 className="font-bold text-sm">Submission Failed</h4><p className="text-xs opacity-90 mt-0.5">{error}</p></div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Name *</label>
              <input type="text" required value={name} onChange={e => handleFieldChange('name', e.target.value)} onBlur={e => handleBlur('name', e.target.value)} placeholder="Your full name" className={`w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border ${validationErrors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-white/10 focus:border-blue-500'} rounded-xl outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-sm`} />
              {validationErrors.name && <p className="text-red-500 text-xs mt-0.5">{validationErrors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email *</label>
              <input type="email" required value={email} onChange={e => handleFieldChange('email', e.target.value)} onBlur={e => handleBlur('email', e.target.value)} placeholder="you@example.com" className={`w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border ${validationErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-white/10 focus:border-blue-500'} rounded-xl outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-sm`} />
              {validationErrors.email && <p className="text-red-500 text-xs mt-0.5">{validationErrors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone</label>
              <input type="tel" value={phone} onChange={e => handleFieldChange('phone', e.target.value)} onBlur={e => handleBlur('phone', e.target.value)} placeholder="+91 98765 43210" className={`w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border ${validationErrors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-white/10 focus:border-blue-500'} rounded-xl outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-sm`} />
              {validationErrors.phone && <p className="text-red-500 text-xs mt-0.5">{validationErrors.phone}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Service Interested In</label>
              <select value={serviceId} onChange={e => setServiceId(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 transition-all text-gray-900 dark:text-white text-sm">
                <option value="">Select service (Optional)</option>
                {isLoadingServices ? <option disabled>Loading services...</option> : services.map(s => <option key={s.id} value={String(s.id)}>{s.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Event Type</label>
              <select value={eventType} onChange={e => setEventType(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 transition-all text-gray-900 dark:text-white text-sm">
                <option value="">Select event type (Optional)</option>
                {EVENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Event Date</label>
              <DatePicker 
                value={eventDate} 
                onChange={date => handleFieldChange('eventDate', date)} 
                onBlur={() => handleBlur('eventDate', eventDate)}
                placeholder="Select event date" 
                error={validationErrors.eventDate}
              />
              {validationErrors.eventDate && <p className="text-red-500 text-xs mt-0.5">{validationErrors.eventDate}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Budget Range</label>
              <select value={budgetIndex} onChange={e => setBudgetIndex(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-blue-500 transition-all text-gray-900 dark:text-white text-sm">
                <option value="">Select budget range (Optional)</option>
                {BUDGET_RANGES.map((b, idx) => <option key={idx} value={String(idx)}>{b.label}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Expected Guests</label>
              <input type="number" value={guestCount} onChange={e => handleFieldChange('guestCount', e.target.value)} onBlur={e => handleBlur('guestCount', e.target.value)} placeholder="e.g. 500" className={`w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border ${validationErrors.guestCount ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-white/10 focus:border-blue-500'} rounded-xl outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-sm`} />
              {validationErrors.guestCount && <p className="text-red-500 text-xs mt-0.5">{validationErrors.guestCount}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">City / Venue Location</label>
            <input type="text" value={city} onChange={e => handleFieldChange('city', e.target.value)} onBlur={e => handleBlur('city', e.target.value)} placeholder="e.g. Pune, Maharashtra" className={`w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border ${validationErrors.city ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-white/10 focus:border-blue-500'} rounded-xl outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-sm`} />
            {validationErrors.city && <p className="text-red-500 text-xs mt-0.5">{validationErrors.city}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Your Message / Requirements</label>
            <textarea rows={4} value={message} onChange={e => handleFieldChange('message', e.target.value)} onBlur={e => handleBlur('message', e.target.value)} placeholder="Share details about your vision, artists you want, technical specifications..." className={`w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border ${validationErrors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-white/10 focus:border-blue-500'} rounded-xl outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 text-sm resize-none`} />
            {validationErrors.message && <p className="text-red-500 text-xs mt-0.5">{validationErrors.message}</p>}
          </div>

          <button type="submit" disabled={isLoading} className="relative w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] disabled:opacity-70 overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            <div className="relative flex items-center justify-center gap-2">
              {isLoading ? <><LoaderIcon className="w-5 h-5 animate-spin" /><span>Submitting Inquiry...</span></> : <><SendIcon className="w-4 h-4" /><span>Submit Inquiry</span></>}
            </div>
          </button>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-[#0a0a0a] pt-32 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">Get in Touch</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
            Let's{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Connect</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Have a question or want to discuss your next event? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">We're here to help and answer any question you might have. We look forward to hearing from you.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                  <MailIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Email</p>
                  <a href="mailto:info@phoenixinfotainment.com" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">info@phoenixinfotainment.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center shrink-0">
                  <PhoneIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Phone</p>
                  <a href="tel:+919876543210" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">+91 98765 43210</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center shrink-0">
                  <MapPinIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Office</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pune, Maharashtra, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0">
                  <ClockIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Working Hours</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mon – Sat: 10 AM – 7 PM</p>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="lg:col-span-3">
            <Suspense fallback={
              <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px]">
                <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="mt-4 text-gray-500 text-sm font-medium">Loading form...</span>
              </div>
            }>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
