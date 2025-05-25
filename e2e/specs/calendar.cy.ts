import { createArtifact, editorTodo, outlineNodes, pageCalendar, pageOpen, typicalDates } from "../helpers";

describe("calendar", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();

    outlineNodes.toogleOf(outlineNodes.rootNode()).click();

    outlineNodes.rootNodeContent().click();
    const openTodoName = "open-todo.todo";
    createArtifact(openTodoName);
    outlineNodes.nodeLabeledAs(openTodoName).click();
    editorTodo.dates.tab().click();

    editorTodo.dates.inputStart.typeDateTime(typicalDates.yesterday.start);
    editorTodo.dates.inputDue.typeDateTime(typicalDates.today.end);

    outlineNodes.rootNodeContent().click();
    const doneTodoName = "done-todo.todo";
    createArtifact(doneTodoName);
    outlineNodes.nodeLabeledAs(doneTodoName).click();
    editorTodo.dates.tab().click();
    editorTodo.dates.inputStart.typeDateTime(typicalDates.yesterday.start);
    editorTodo.dates.inputDue.typeDateTime(typicalDates.tomorrow.end);
    editorTodo.main.progress.done().click();

    pageCalendar.calendar().click();
  });

  it("highlights calendar dates with uncompleted todos active in that day", () => {
    pageCalendar.monthViewer.date(typicalDates.yesterday.start.getDate()).should("have.attr", "data-test-highlighted", "true");
    pageCalendar.monthViewer.date(typicalDates.today.start.getDate()).should("have.attr", "data-test-highlighted", "true");
    pageCalendar.monthViewer.date(typicalDates.tomorrow.start.getDate()).should("have.attr", "data-test-highlighted", "false");
  });

  it("shows todos' timeline for the selected date in calendar", () => {
    pageCalendar.monthViewer.date(typicalDates.yesterday.start.getDate()).click();
    pageCalendar.timelineViewer.todos().should("have.length", 2);

    pageCalendar.monthViewer.date(typicalDates.tomorrow.start.getDate()).click();
    pageCalendar.timelineViewer.todos().should("have.length", 1);
  });
});