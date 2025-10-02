import {
  createTodo,
  openMemory,
} from "../macros";
import {
  outlineNodes,
  outlinePriority,
  pageFolders,
} from "../selectors";

describe("outline-priority", () => {
  const todoOne = "todoOne.todo";
  const todoTwo = "todoTwo.todo";

  const tagCycle = "cycle";
  const tagToday = "today";
  const criterionImportancy = "importancy";
  const criterionUrgency = "urgency";

  beforeEach(() => {
    openMemory();

    cy.get(outlineNodes.nodeToogle).first().click();
    cy.get(outlineNodes.nodeInline).first().click();

    createTodo({
      criteria: [{
        label: criterionImportancy,
        value: "0.25"
      }, {
        label: criterionUrgency,
        value: "0.75"
      }],
      name: todoOne,
      tags: [tagCycle, tagToday]
    });

    createTodo({
      criteria: [{
        label: criterionImportancy,
        value: "0.80"
      }, {
        label: criterionUrgency,
        value: "0.10"
      }],
      name: todoTwo,
      tags: [tagCycle]
    });

    pageFolders.priority().click();
  });

  it("does not show items if no tags are selected", () => {
    cy.get(outlinePriority.nodes.node).should("have.length", 0);
  });

  it("filter by tag", () => {
    cy.get(outlinePriority.filters.tag.input).click();
    cy.get(outlinePriority.filters.tag.option(tagCycle)).click();
    cy.get(outlinePriority.nodes.node).should("have.length", 2);

    cy.get(outlinePriority.filters.tag.input).click();
    cy.get(outlinePriority.filters.tag.option(tagToday)).click();
    cy.get(outlinePriority.nodes.node).should("have.length", 1);
  });

  it("sort priority or criterion", () => {
    cy.get(outlinePriority.filters.tag.input).click();
    cy.get(outlinePriority.filters.tag.option(tagCycle)).click();
    cy.get(outlinePriority.nodes.node).should("have.length", 2);

    cy.get(outlinePriority.nodes.node).eq(0).contains(todoOne);
    cy.get(outlinePriority.nodes.node).eq(1).contains(todoTwo);

    cy.get(outlinePriority.filters.criterion.input).click();
    cy.get(outlinePriority.filters.criterion.option(criterionImportancy)).click();
    cy.get(outlinePriority.nodes.node).eq(1).contains(todoTwo);
    cy.get(outlinePriority.nodes.node).eq(0).contains(todoOne);

    cy.get(outlinePriority.filters.criterion.input).click();
    cy.get(outlinePriority.filters.criterion.option(criterionUrgency)).click();
    cy.get(outlinePriority.nodes.node).eq(0).contains(todoOne);
    cy.get(outlinePriority.nodes.node).eq(1).contains(todoTwo);
  });

});