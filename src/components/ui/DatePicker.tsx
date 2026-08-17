'use client';

import { useState, useEffect, useRef } from 'react';


const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
}

export function DatePicker({
  value,
  onChange,
  onBlur,
  placeholder = 'Select event date',
  error
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  
  const selectedDate = value ? new Date(value) : null;

  
  useEffect(() => {
    if (selectedDate) {
      setCurrentYear(selectedDate.getFullYear());
      setCurrentMonth(selectedDate.getMonth());
    }
  }, [value]);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
          if (onBlur) onBlur();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onBlur]);

  
  const getFormattedDisplay = () => {
    if (!selectedDate || isNaN(selectedDate.getTime())) return '';
    return selectedDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  const calendarCells = [];

  
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const cellYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const cellMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    calendarCells.push({
      day: d,
      isCurrentMonth: false,
      dateString: `${cellYear}-${String(cellMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      dateObj: new Date(cellYear, cellMonth, d)
    });
  }

  
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({
      day: d,
      isCurrentMonth: true,
      dateString: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      dateObj: new Date(currentYear, currentMonth, d)
    });
  }

  
  const remaining = 42 - calendarCells.length;
  for (let d = 1; d <= remaining; d++) {
    const cellYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const cellMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    calendarCells.push({
      day: d,
      isCurrentMonth: false,
      dateString: `${cellYear}-${String(cellMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      dateObj: new Date(cellYear, cellMonth, d)
    });
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(prev => prev - 1);
      } else {
        setCurrentMonth(prev => prev - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(prev => prev + 1);
      } else {
        setCurrentMonth(prev => prev + 1);
      }
    }
  };

  const handleDateSelect = (dateString: string) => {
    onChange(dateString);
    setIsOpen(false);
  };

  
  const isPastDate = (dateObj: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateObj < today;
  };

  
  const isSelected = (dateString: string) => {
    return value === dateString;
  };

  
  const isToday = (dateObj: Date) => {
    const today = new Date();
    return (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      {}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-black/20 border ${
          error ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-white/10 focus:border-blue-500'
        } rounded-xl outline-none text-left transition-all text-sm cursor-pointer`}
      >
        <span className={getFormattedDisplay() ? 'text-gray-900 dark:text-white' : 'text-gray-400'}>
          {getFormattedDisplay() || placeholder}
        </span>
        <CalendarIcon className="text-gray-400 dark:text-gray-500 shrink-0 ml-2" />
      </button>

      {}
      {isOpen && (
        <div className="absolute left-0 mt-2 z-30 w-full max-w-[340px] bg-white dark:bg-[#0f0f0f] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-4 animate-fadeIn">
          
          {}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigateMonth('prev')}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <ChevronLeftIcon />
            </button>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </h4>
            <button
              type="button"
              onClick={() => navigateMonth('next')}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <ChevronRightIcon />
            </button>
          </div>

          {}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {DAYS_OF_WEEK.map((day, idx) => (
              <span key={idx} className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {day}
              </span>
            ))}
          </div>

          {}
          <div className="grid grid-cols-7 gap-1">
            {calendarCells.map((cell, idx) => {
              const disabled = isPastDate(cell.dateObj);
              const selected = isSelected(cell.dateString);
              const today = isToday(cell.dateObj);

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleDateSelect(cell.dateString)}
                  className={`aspect-square w-full rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                    !cell.isCurrentMonth ? 'text-gray-300 dark:text-gray-700 font-light' : 'text-gray-800 dark:text-gray-300'
                  } ${
                    today && !selected ? 'border border-blue-500/50 text-blue-500' : ''
                  } ${
                    selected
                      ? 'bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 text-white shadow-md'
                      : disabled
                      ? 'opacity-25 cursor-not-allowed text-gray-400 dark:text-gray-600'
                      : 'hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer'
                  }`}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
}
