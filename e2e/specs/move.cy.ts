import {
  dataTest, openMacros, outlineNodes
} from "../helpers";

describe("move", () => {
  beforeEach(() => {
    openMacros.openMemory();
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
  });

  const dragFormat = "application/outline-item";

  it("allows directory move", () => {
    outlineNodes
      .inlineNodeOf(outlineNodes.directoryOf(outlineNodes.rootNode()).eq(0))
      .as("sourceNode");

    outlineNodes
      .inlineNodeOf(outlineNodes.directoryOf(outlineNodes.rootNode()).eq(1))
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

        outlineNodes
          .directoryOf(outlineNodes.rootNode()).eq(0)
          .find(dataTest(dataTestString))
          .should("not.exist");

        outlineNodes
          .directoryOf(outlineNodes.rootNode()).eq(0)
          .as("targetNodeRecatch");

        outlineNodes
          .toogleOf(cy.get("@targetNodeRecatch"))
          .click();

        cy.get("@targetNodeRecatch")
          .find(dataTest(dataTestString))
          .should("exist");
      });
  });

  it("cant move to descendant", () => {
    outlineNodes
      .directoryOf(outlineNodes.rootNode()).eq(0)
      .as("sourceNodeWrapper");

    outlineNodes
      .inlineNodeOf(cy.get("@sourceNodeWrapper")).eq(0)
      .as("sourceNode");

    outlineNodes
      .toogleOf(cy.get("@sourceNodeWrapper"))
      .click();

    outlineNodes
      .childrenOf(cy.get("@sourceNodeWrapper")).eq(0)
      .as("targetNodeWrapper");

    outlineNodes
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
