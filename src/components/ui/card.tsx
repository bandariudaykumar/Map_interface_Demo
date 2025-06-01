import * as React from 'react';
import { cn } from '@/lib/utils';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface CalendarProps extends React.ComponentProps<typeof DayPicker> {}

export function Calendar({ className, ...props }: CalendarProps) {
  return (
    <div className={cn('p-3', className)}>
      <DayPicker
        showOutsideDays
        className="rounded-lg border bg-white text-black shadow-md dark:bg-black dark:text-white"
        classNames={{
          caption: 'flex justify-center py-2 relative items-center',
          nav: 'flex items-center',
          nav_button:
            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          nav_button_previous: 'absolute left-1',
          nav_button_next: 'absolute right-1',
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex',
          head_cell:
            'text-gray-500 rounded-md w-9 font-normal text-[0.8rem]',
          row: 'flex w-full mt-2',
          cell:
            'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day)]::after:content-[""] [&:has([aria-selected].day)]::after:absolute [&:has([aria-selected].day)]::after:inset-0 [&:has([aria-selected].day)]::after:rounded-md [&:has([aria-selected].day)]::after:ring-1 [&:has([aria-selected].day)]::after:ring-primary',
          day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
          day_selected:
            'bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90',
          day_today: 'bg-accent text-accent-foreground',
          day_outside: 'text-muted-foreground opacity-50',
          day_disabled: 'text-muted opacity-50',
          day_range_middle:
            'aria-selected:bg-muted aria-selected:text-muted-foreground',
          day_hidden: 'invisible',
        }}
        components={{
          // you can customize header/footer here if needed
          // no props errors now because we removed/renamed them if unused
        }}
        {...props}
      />
    </div>
  );
}
