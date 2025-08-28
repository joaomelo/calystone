import {
  createDirectory,
  createTodo,
  openMemory
} from "../macros";
import {
  editorTodo,
  frameDashboard,
  outlineNodes,
  pageFolders,
  pageSearch
} from "../selectors";

describe("link-path", () => {
  beforeEach(() => {
    openMemory();
  });

  it("reach folders page with corresponded node selected", () => {
    cy.get(outlineNodes.nodeToogle).first().click();
    cy.get(outlineNodes.nodeInline).first().click();

    const directoryName = "folder-in-root";
    createDirectory(directoryName);

    cy.get(outlineNodes.nodeLabel(directoryName))
      .click();
    cy.get(outlineNodes.nodeTreeWithLabel(directoryName))
      .find(outlineNodes.nodeToogle)
      .click();

    const todoName = "todo-in-folder.todo";
    createTodo({ name: todoName });

    frameDashboard.search().click();
    pageSearch.input().type(todoName);
    cy.get(outlineNodes.nodeLabel(todoName))
      .click();

    editorTodo.main.sheet.pathValue().click();

    cy.url().should("include", pageFolders.url());
    cy.get(outlineNodes.nodeTreeWithLabel(todoName)).should("have.attr", "aria-checked", "true");
  });
});