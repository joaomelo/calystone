import {
  describe, expect, it
} from "vitest";

import { Recurrer } from "./recurrer";

describe("recurrer", () => {
  it("should calculate next occurrence for an all-day task", () => {
    const recurrer = new Recurrer();
    recurrer.reference.value = "due";
    recurrer.step.value = 1;
    recurrer.unit.value = "days";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);

    const result = recurrer.next({
      due: todayEnd,
      start: today
    });

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowEnd = new Date(tomorrow);
    tomorrowEnd.setHours(23, 59, 59, 999);

    expect(result.start.getTime()).toBe(tomorrow.getTime());
    expect(result.due.getTime()).toBe(tomorrowEnd.getTime());
  });

  it("should maintain same time span when using completion reference", () => {
    const recurrer = new Recurrer();
    recurrer.reference.value = "completion";
    recurrer.step.value = 1;
    recurrer.unit.value = "days";

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const tomorrowEnd = new Date(tomorrow);
    tomorrowEnd.setHours(23, 59, 59, 999);

    const result = recurrer.next({
      due: tomorrowEnd,
      start: tomorrow
    });

    expect(result.start.getTime()).toBe(tomorrow.getTime());
    expect(result.due.getTime()).toBe(tomorrowEnd.getTime());
  });

  it("should calculate next occurrence for overdue weekly task", () => {
    const recurrer = new Recurrer();
    recurrer.reference.value = "due";
    recurrer.step.value = 1;
    recurrer.unit.value = "weeks";

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(20, 0, 0, 0);
    const yesterdayEnd = new Date(yesterday);
    yesterdayEnd.setHours(21, 0, 0, 0);

    const result = recurrer.next({
      due: yesterdayEnd,
      start: yesterday
    });

    const nextWeek = new Date(yesterday);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekEnd = new Date(yesterdayEnd);
    nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);

    expect(result.start.getTime()).toBe(nextWeek.getTime());
    expect(result.due.getTime()).toBe(nextWeekEnd.getTime());
  });

  it("should handle yearly recurrence with completion reference", () => {
    const recurrer = new Recurrer();
    recurrer.reference.value = "completion";
    recurrer.step.value = 1;
    recurrer.unit.value = "years";

    const today = new Date();
    today.setHours(10, 0, 0, 0);
    const originalDue = new Date(today);
    originalDue.setHours(15, 0, 0, 0);

    const result = recurrer.next({
      due: originalDue,
      start: today
    });

    const nextYear = new Date(today);
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const nextYearDue = new Date(originalDue);
    nextYearDue.setFullYear(nextYearDue.getFullYear() + 1);

    expect(result.start.getTime()).toBe(nextYear.getTime());
    expect(result.due.getTime()).toBe(nextYearDue.getTime());
  });

  it("should handle bi-weekly recurrence", () => {
    const recurrer = new Recurrer();
    recurrer.reference.value = "due";
    recurrer.step.value = 2;
    recurrer.unit.value = "weeks";

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(19, 0, 0, 0);
    const yesterdayEnd = new Date(yesterday);
    yesterdayEnd.setHours(20, 0, 0, 0);

    const result = recurrer.next({
      due: yesterdayEnd,
      start: yesterday
    });

    const twoWeeksLater = new Date(yesterday);
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
    const twoWeeksLaterEnd = new Date(yesterdayEnd);
    twoWeeksLaterEnd.setDate(twoWeeksLaterEnd.getDate() + 14);

    expect(result.start.getTime()).toBe(twoWeeksLater.getTime());
    expect(result.due.getTime()).toBe(twoWeeksLaterEnd.getTime());
  });

  it("should handle month end edge case", () => {
    const recurrer = new Recurrer();
    recurrer.reference.value = "due";
    recurrer.step.value = 1;
    recurrer.unit.value = "months";

    const lastDayOfMonth = new Date();
    lastDayOfMonth.setMonth(0);
    lastDayOfMonth.setDate(31);
    lastDayOfMonth.setHours(14, 0, 0, 0);
    const lastDayOfMonthEnd = new Date(lastDayOfMonth);
    lastDayOfMonthEnd.setHours(15, 0, 0, 0);

    const result = recurrer.next({
      due: lastDayOfMonthEnd,
      start: lastDayOfMonth
    });

    const nextMonth = new Date(lastDayOfMonth);
    nextMonth.setMonth(1);
    const nextMonthDue = new Date(lastDayOfMonthEnd);
    nextMonthDue.setMonth(1);

    expect(result.start.getTime()).toBe(nextMonth.getTime());
    expect(result.due.getTime()).toBe(nextMonthDue.getTime());
  });

  it("should handle year", () => {
    const recurrer = new Recurrer();
    recurrer.reference.value = "due";
    recurrer.step.value = 1;
    recurrer.unit.value = "years";

    const lastDayOfYear = new Date();
    lastDayOfYear.setMonth(11);
    lastDayOfYear.setDate(31);
    lastDayOfYear.setHours(22, 0, 0, 0);
    const lastDayOfYearEnd = new Date(lastDayOfYear);
    lastDayOfYearEnd.setHours(23, 0, 0, 0);

    const result = recurrer.next({
      due: lastDayOfYearEnd,
      start: lastDayOfYear
    });

    const nextYear = new Date(lastDayOfYear);
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const nextYearDue = new Date(lastDayOfYearEnd);
    nextYearDue.setFullYear(nextYearDue.getFullYear() + 1);

    expect(result.start.getTime()).toBe(nextYear.getTime());
    expect(result.due.getTime()).toBe(nextYearDue.getTime());
  });
});
