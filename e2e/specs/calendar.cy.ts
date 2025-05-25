import { addDays, createArtifact, editorTodo, endOfDay, outlineNodes, pageCalendar, pageOpen, startOfDay, typeableDateTime } from "../helpers";

describe("calendar", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
  });

  const today = {
    end: endOfDay(new Date()),
    start: startOfDay(new Date()),
  };

  const yesterday = {
    end: addDays(today.end, -1),
    start: addDays(today.start, - 1),
  };

  const tomorrow = {
    end: addDays(today.end, 1),
    start: addDays(today.start, 1),
  };

  it.only("highlights calendar dates with uncompleted todos active in that day", () => {
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();

    outlineNodes.rootNodeContent().click();
    const openTodoName = "open-todo.todo";
    createArtifact(openTodoName);
    outlineNodes.nodeLabeledAs(openTodoName).click();
    editorTodo.dates.tab().click();

    editorTodo.dates.inputStart().invoke("val", typeableDateTime(yesterday.start)).trigger("input");
    editorTodo.dates.inputDue().invoke("val", typeableDateTime(today.end)).trigger("input");

    outlineNodes.rootNodeContent().click();
    const doneTodoName = "done-todo.todo";
    createArtifact(doneTodoName);
    outlineNodes.nodeLabeledAs(doneTodoName).click();
    editorTodo.dates.tab().click();
    editorTodo.dates.inputStart().invoke("val", typeableDateTime(tomorrow.start)).trigger("input");
    editorTodo.dates.inputDue().invoke("val", typeableDateTime(tomorrow.end)).trigger("input");
    editorTodo.main.progress.done().click();

    pageCalendar.calendar().click();

    pageCalendar.monthViewer.date(yesterday.start.getDate()).should("have.attr", "data-test-highlighted", "true");
    pageCalendar.monthViewer.date(today.start.getDate()).should("have.attr", "data-test-highlighted", "true");
    pageCalendar.monthViewer.date(tomorrow.start.getDate()).should("have.attr", "data-test-highlighted", "false");
  });

  it("shows todos' timeline for the selected date in calendar", () => {
    // create a todo starting today and ending tomorrom and complete it
    // create a todo starting and ending today
    // go to calendar view
    // selected yesterday and see that nothing is show
    // selected today and see that both todos are visible
    // select tomorrow and see that only on todo is shown
  });

});