import { dataTest } from "./data-test";
import { frameDashboard } from "./frame-dashboard";

export const pageCalendar = {
  monthViewer: {
    date: (day: Date) => {
      const dayLabel = Math.floor(day).toString();
      return cy.get(`.p-datepicker-day-cell[aria-label="${dayLabel}"] .month-viewer__date`);
    },
  },
  timelineViewer: {
    todos: () => cy.get(dataTest("timeline-viewer__item")),
  },
  ...frameDashboard
} as const;