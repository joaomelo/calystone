import {
  createArtifact, editorTodo, openMacros, outlineNodes, pageCalendar, typicalDates
} from "../helpers";

describe("calendar", () => {
  const dayOne = typicalDates.dayOfMonth(1);
  const dayTwo = typicalDates.dayOfMonth(2);
  const dayThree = typicalDates.dayOfMonth(3);

  beforeEach(() => {
    openMacros.openMemory();

    outlineNodes.toogleOf(outlineNodes.rootNode()).click();

    outlineNodes.rootNodeContent().click();
    const openTodoName = "open-todo.todo";
    createArtifact(openTodoName);
    outlineNodes.nodeLabeledAs(openTodoName).click();
    editorTodo.dates.tab().click();

    editorTodo.dates.inputStart.typeDateTime(dayOne.start);
    editorTodo.dates.inputDue.typeDateTime(dayTwo.end);

    outlineNodes.rootNodeContent().click();
    const doneTodoName = "done-todo.todo";
    createArtifact(doneTodoName);
    outlineNodes.nodeLabeledAs(doneTodoName).click();
    editorTodo.dates.tab().click();
    editorTodo.dates.inputStart.typeDateTime(dayOne.start);
    editorTodo.dates.inputDue.typeDateTime(dayThree.end);
    editorTodo.main.progress.done().click();

    pageCalendar.calendar().click();
  });

  it("highlights calendar dates with uncompleted todos active in that day", () => {
    pageCalendar.monthViewer.date(dayOne.start.getDate()).should("have.attr", "data-test-highlighted", "true");
    pageCalendar.monthViewer.date(dayTwo.start.getDate()).should("have.attr", "data-test-highlighted", "true");
    pageCalendar.monthViewer.date(dayThree.start.getDate()).should("have.attr", "data-test-highlighted", "false");
  });

  it("shows todos' timeline for the selected date in calendar", () => {
    pageCalendar.monthViewer.date(dayOne.start.getDate()).click();
    pageCalendar.timelineViewer.todos().should("have.length", 2);

    pageCalendar.monthViewer.date(dayThree.start.getDate()).click();
    pageCalendar.timelineViewer.todos().should("have.length", 1);
  });
});