import { dataTest, outline, pageOpen } from "../helpers";

describe("remove", () => {
  beforeEach(() => {
    pageOpen.macros.openMemory();
    outline.toogleOf(outline.rootNode()).click();
  });

  const selectors = {
    buttonCancel: () => cy.get(dataTest("modal-remove-cancel")),
    buttonConfirm: () => cy.get(dataTest("modal-remove-confirm")),
    buttonRemove: () => cy.get(dataTest("button-remove")),
  } as const;

  it("allows directory remove", () => {
    outline.directoryOf(outline.rootNode()).first().as("directory");
    outline.labelOf(cy.get("@directory")).then((oldLabel) => {
      cy.get("@directory").click();
      selectors.buttonRemove().click();
      selectors.buttonConfirm().click();

      outline.labelOf(outline.directoryOf(outline.rootNode()).first())
        .then((newLabel) => {
          expect(newLabel).to.not.equal(oldLabel);
        });
    });
  });

  it("allows artifact remove", () => {
    outline.artifactOf(outline.rootNode()).first().as("artifact");
    outline.labelOf(cy.get("@artifact")).then((oldLabel) => {
      cy.get("@artifact").click();
      selectors.buttonRemove().click();
      selectors.buttonConfirm().click();

      outline.labelOf(outline.artifactOf(outline.rootNode()).first())
        .then((newLabel) => {
          expect(newLabel).to.not.equal(oldLabel);
        });
    });
  });

  it("does not remove if user cancels", () => {
    outline.artifactOf(outline.rootNode()).first().as("artifact");
    outline.labelOf(cy.get("@artifact")).then((oldLabel) => {
      cy.get("@artifact").click();
      selectors.buttonRemove().click();
      selectors.buttonCancel().click();

      outline.labelOf(outline.artifactOf(outline.rootNode()).first())
        .then((newLabel) => {
          expect(newLabel).to.equal(oldLabel);
        });
    });
  });
});
