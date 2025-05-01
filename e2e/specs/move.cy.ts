import { dataTest, outline, pageOpen } from "../helpers";

describe("move", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
    outlineNodes.toogleOf(outlineNodes.rootNode()).click();
  });

  const dragFormat = "application/outline-item";

  it("allows directory move", () => {
    outline
      .inlineNodeOf(outlineNodes.directoryOf(outlineNodes.rootNode()).eq(0))
      .as("sourceNode");

    outline
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

        outline
          .directoryOf(outlineNodes.rootNode()).eq(0)
          .find(dataTest(dataTestString))
          .should("not.exist");

        outline
          .directoryOf(outlineNodes.rootNode()).eq(0)
          .as("targetNodeRecatch");

        outline
          .toogleOf(cy.get("@targetNodeRecatch"))
          .click();

        cy.get("@targetNodeRecatch")
          .find(dataTest(dataTestString))
          .should("exist");
      });
  });

  it("cant move to descendant", () => {
    outline
      .directoryOf(outlineNodes.rootNode()).eq(0)
      .as("sourceNodeWrapper");

    outline
      .inlineNodeOf(cy.get("@sourceNodeWrapper")).eq(0)
      .as("sourceNode");

    outline
      .toogleOf(cy.get("@sourceNodeWrapper"))
      .click();

    outline
      .childrenOf(cy.get("@sourceNodeWrapper")).eq(0)
      .as("targetNodeWrapper");

    outline
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
