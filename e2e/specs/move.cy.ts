import {
  dataTest,
  openMacros,
  outlineNodesLegacy
} from "../helpers";

describe("move", () => {
  beforeEach(() => {
    openMacros.openMemory();
    outlineNodesLegacy.toogleOf(outlineNodesLegacy.rootNode()).click();
  });

  const dragFormat = "application/outline-item";

  it("allows directory move", () => {
    outlineNodesLegacy
      .inlineNodeOf(outlineNodesLegacy.directoryOf(outlineNodesLegacy.rootNode()).eq(0))
      .as("sourceNode");

    outlineNodesLegacy
      .inlineNodeOf(outlineNodesLegacy.directoryOf(outlineNodesLegacy.rootNode()).eq(1))
      .as("targetNode");

    cy.get("@sourceNode")
      .invoke("attr", "data-test")
      .then(dataTestString => {
        if (typeof dataTestString !== "string") throw new Error("dataTestString is not a string");

        const dataTransfer = new DataTransfer();
        dataTransfer.setData(dragFormat, dataTestString);

        cy.get("@sourceNode")
          .trigger("dragstart", { dataTransfer })
          .trigger("drag");

        cy.get("@targetNode")
          .trigger("dragover", { dataTransfer })
          .trigger("drop", { dataTransfer });

        outlineNodesLegacy
          .directoryOf(outlineNodesLegacy.rootNode()).eq(0)
          .find(dataTest(dataTestString))
          .should("not.exist");

        outlineNodesLegacy
          .directoryOf(outlineNodesLegacy.rootNode()).eq(0)
          .as("targetNodeRecatch");

        outlineNodesLegacy
          .toogleOf(cy.get("@targetNodeRecatch"))
          .click();

        cy.get("@targetNodeRecatch")
          .find(dataTest(dataTestString))
          .should("exist");
      });
  });

  it("cant move to descendant", () => {
    outlineNodesLegacy
      .directoryOf(outlineNodesLegacy.rootNode()).eq(0)
      .as("sourceNodeWrapper");

    outlineNodesLegacy
      .inlineNodeOf(cy.get("@sourceNodeWrapper")).eq(0)
      .as("sourceNode");

    outlineNodesLegacy
      .toogleOf(cy.get("@sourceNodeWrapper"))
      .click();

    outlineNodesLegacy
      .childrenOf(cy.get("@sourceNodeWrapper")).eq(0)
      .as("targetNodeWrapper");

    outlineNodesLegacy
      .inlineNodeOf(cy.get("@targetNodeWrapper"))
      .as("targetNode");

    cy.get("@sourceNode")
      .invoke("attr", "data-test")
      .then(dataTestString => {
        if (typeof dataTestString !== "string") throw new Error("dataTestString is not a string");

        const dataTransfer = new DataTransfer();
        dataTransfer.setData(dragFormat, dataTestString);

        cy.get("@sourceNode")
          .trigger("dragstart", { dataTransfer })
          .trigger("drag");

        cy.get("@targetNode")
          .trigger("dragover", { dataTransfer })
          .trigger("drop", { dataTransfer });

        cy.get("@sourceNode")
          .should("exist");

        cy.get("@targetNode")
          .should("exist");
      });
  });
});
