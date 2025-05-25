import { frameDashboard } from "./frame-dashboard";

export const pageCalendar = {
  monthViewer: {
    date: (day: number) => {
      const dayLabel = Math.floor(day).toString();
      return cy.get(`.p-datepicker-day-cell[aria-label="${dayLabel}"] .month-viewer__date`);
    },
  },
  ...frameDashboard
} as const;