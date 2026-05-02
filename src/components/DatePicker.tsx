import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isAfter,
  isBefore,
  startOfDay,
  parseISO
} from 'date-fns';

interface DatePickerProps {
  startDate: string;
  endDate: string | null;
  onChange: (start: string, end: string | null) => void;
  onClose: () => void;
}

export default function DatePicker({ startDate, endDate, onChange, onClose }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(startDate ? parseISO(startDate) : new Date());
  
  const parsedStart = startDate ? parseISO(startDate) : null;
  const parsedEnd = endDate ? parseISO(endDate) : null;

  const [selectingStart, setSelectingStart] = useState<boolean>(true);

  // When opening, default to selecting the start date if not set, else end date
  useEffect(() => {
    if (!parsedStart || (parsedStart && parsedEnd && isSameDay(parsedStart, parsedEnd))) {
      setSelectingStart(true);
    } else if (parsedStart && !parsedEnd) {
      setSelectingStart(false);
    } else {
      setSelectingStart(true);
    }
  }, []);

  const handleDateClick = (day: Date) => {
    if (selectingStart) {
      onChange(format(day, 'yyyy-MM-dd'), null);
      setSelectingStart(false);
    } else {
      if (parsedStart && isBefore(day, parsedStart)) {
        // Switch order automatically
        onChange(format(day, 'yyyy-MM-dd'), format(parsedStart, 'yyyy-MM-dd'));
      } else if (parsedStart) {
        onChange(format(parsedStart, 'yyyy-MM-dd'), format(day, 'yyyy-MM-dd'));
      }
      onClose(); // Auto close after selecting end date
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button type="button" onClick={prevMonth} className="p-2 hover:bg-brand-surface rounded-lg transition-colors">
        <ChevronLeft className="w-5 h-5 text-brand-dark" />
      </button>
      <span className="text-sm font-semibold text-brand-dark">
        {format(currentMonth, 'MMMM yyyy')}
      </span>
      <button type="button" onClick={nextMonth} className="p-2 hover:bg-brand-surface rounded-lg transition-colors">
        <ChevronRight className="w-5 h-5 text-brand-dark" />
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(new Date());
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-semibold text-[10px] uppercase text-brand-text-muted mb-2">
          {format(addDays(startDate, i), 'EEE')}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDateView = startOfWeek(monthStart);
    const endDateView = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDateView;
    let formattedDate = '';

    while (day <= endDateView) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const isSelectedStart = parsedStart && isSameDay(day, parsedStart);
        const isSelectedEnd = parsedEnd && isSameDay(day, parsedEnd);
        const isBetween = parsedStart && parsedEnd && isAfter(day, parsedStart) && isBefore(day, parsedEnd);
        const isPast = isBefore(day, startOfDay(new Date()));

        days.push(
          <div
            key={day.toString()}
            className={`relative p-1 flex items-center justify-center cursor-pointer transition-colors
              ${!isSameMonth(day, monthStart) ? 'text-gray-300 pointer-events-none' : ''}
              ${isPast ? 'text-gray-300 pointer-events-none' : ''}
              ${isBetween ? 'bg-gray-200' : ''}
              ${isSelectedStart ? 'bg-gray-200 rounded-l-lg' : ''}
              ${isSelectedEnd ? 'bg-gray-200 rounded-r-lg' : ''}
            `}
            onClick={() => {
              if (!isPast && isSameMonth(cloneDay, monthStart)) {
                handleDateClick(cloneDay);
              }
            }}
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-all
              ${(isSelectedStart || isSelectedEnd) ? 'bg-brand-dark text-white shadow-md' : 'hover:bg-brand-surface text-brand-dark'}
              ${!isSameMonth(day, monthStart) || isPast ? 'text-gray-300 hover:bg-transparent' : ''}
            `}>
              {formattedDate}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-brand-border shadow-xl w-[320px] select-none">
      <div className="flex gap-2 mb-4 p-1 bg-brand-surface rounded-lg">
        <button 
          type="button"
          onClick={() => setSelectingStart(true)}
          className={`flex-1 text-xs font-semibold py-2 rounded-md transition-all ${selectingStart ? 'bg-brand-dark shadow-sm text-white' : 'text-brand-text-muted hover:text-brand-dark'}`}
        >
          Pick-up
        </button>
        <button 
          type="button"
          onClick={() => setSelectingStart(false)}
          className={`flex-1 text-xs font-semibold py-2 rounded-md transition-all ${!selectingStart ? 'bg-brand-dark shadow-sm text-white' : 'text-brand-text-muted hover:text-brand-dark'}`}
        >
          Drop-off
        </button>
      </div>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
