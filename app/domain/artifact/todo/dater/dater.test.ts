import {
  describe,
  expect,
  it
} from "vitest";

import { Dater } from "./dater";

describe("dater", () => {
  describe("constructor", () => {
    it("should set start and due to day extremes if created with allDay true", () => {
      const dater = new Dater({ allDay: true });
      expect(dater.start.getHours()).toBe(0);
      expect(dater.start.getMinutes()).toBe(0);
      expect(dater.due.getHours()).toBe(23);
      expect(dater.due.getMinutes()).toBe(59);
    });

    it("should use the same date for due if only start is passed", () => {
      const dater = new Dater({
        allDay: true,
        start: new Date(2025, 0, 1)
      });

      expect(dater.start.getFullYear()).toBe(2025);
      expect(dater.start.getMonth()).toBe(0);
      expect(dater.start.getDate()).toBe(1);
      expect(dater.start.getHours()).toBe(0);
      expect(dater.start.getMinutes()).toBe(0);

      expect(dater.due.getFullYear()).toBe(2025);
      expect(dater.due.getMonth()).toBe(0);
      expect(dater.due.getDate()).toBe(1);
      expect(dater.due.getHours()).toBe(23);
      expect(dater.due.getMinutes()).toBe(59);
    });

    it("should use the same date for start if only due is passed", () => {
      const dater = new Dater({
        allDay: true,
        due: new Date(2025, 0, 1)
      });

      expect(dater.start.getFullYear()).toBe(2025);
      expect(dater.start.getMonth()).toBe(0);
      expect(dater.start.getDate()).toBe(1);
      expect(dater.start.getHours()).toBe(0);
      expect(dater.start.getMinutes()).toBe(0);

      expect(dater.due.getFullYear()).toBe(2025);
      expect(dater.due.getMonth()).toBe(0);
      expect(dater.due.getDate()).toBe(1);
      expect(dater.due.getHours()).toBe(23);
      expect(dater.due.getMinutes()).toBe(59);
    });
  });

  describe("update", () => {
    describe("bulk update", () => {
      it("update start and due dates", () => {
        const dater = new Dater();
        const newStart = new Date(2025, 0, 1, 10, 5);
        const newDue = new Date(2025, 0, 1, 10, 6);
        dater.update({
          due: newDue,
          start: newStart
        });
        expect(dater.start).toEqual(newStart);
        expect(dater.due).toEqual(newDue);
      });

      it("update start and due dates respecting all day flag", () => {
        const dater = new Dater();
        const newStart = new Date(2025, 0, 1, 10, 5);
        const newDue = new Date(2025, 0, 1, 10, 6);
        dater.update({
          allDay: true,
          due: newDue,
          start: newStart,
        });
        expect(dater.start).toEqual(new Date(2025, 0, 1, 0, 0, 0, 0));
        expect(dater.due).toEqual(new Date(2025, 0, 1, 23, 59, 59, 999));
      });
    });
  });

  describe("spansOn", () => {
    const beginOfToday = new Date();
    beginOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const beginOfYesterday = new Date(beginOfToday);
    beginOfYesterday.setDate(beginOfToday.getDate() - 1);

    const beginOfTomorrow = new Date(beginOfToday);
    beginOfTomorrow.setDate(beginOfTomorrow.getDate() + 1);
    const endOfTomorrow = new Date(endOfToday);
    endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);

    const periodStart = new Date(beginOfToday);
    const periodEnd = new Date(endOfToday);
    const period = {
      end: periodEnd,
      start: periodStart
    };

    it("negates if the dater starts and ends before a period", () => {
      const dater = new Dater({
        allDay: true,
        due: beginOfYesterday
      });
      expect(dater.spansOn(period)).toBe(false);
    });

    it("confirms if the dater ends inside a period", () => {
      const start = new Date(beginOfYesterday);
      const due = new Date(endOfToday);
      due.setHours(14);
      const dater = new Dater({
        allDay: false,
        due,
        start
      });
      expect(dater.spansOn(period)).toBe(true);
    });

    it("confirms if the dater starts and ends inside a period", () => {
      const start = new Date(beginOfToday);
      start.setHours(10);
      const due = new Date(start);
      due.setHours(11);
      const dater = new Dater({
        allDay: false,
        due,
        start
      });
      expect(dater.spansOn(period)).toBe(true);
    });

    it("confirms if the dater starts inside a period", () => {
      const start = new Date(beginOfToday);
      start.setHours(10);
      const due = new Date(endOfTomorrow);
      const dater = new Dater({
        allDay: false,
        due,
        start
      });
      expect(dater.spansOn(period)).toBe(true);
    });

    it("negates if the dater starts and ends after a period", () => {
      const start = new Date(beginOfTomorrow);
      const due = new Date(endOfTomorrow);
      const dater = new Dater({
        allDay: false,
        due,
        start
      });
      expect(dater.spansOn(period)).toBe(false);
    });
  });

});
