import { editPage, outlinePage, signUpPage } from "./shared";

describe("artifact edit", () => {
  beforeEach(() => {
    cy.clearData();
    signUpPage.signUpAuto();
  });

  describe("happy path", () => {
    it("edit artifact name in the outline", () => {
      const parentName = "task 1";
      outlinePage.add(parentName);
      outlinePage.appendUnder(parentName);

      const name = "task 1.1";
      outlinePage.listItemChildOf(parentName).type(`${name}{enter}`);

      outlinePage.listItem(name);
    });

    it("edit artifact name in edit page", () => {
      const name = "task 1";
      outlinePage.add(name);
      outlinePage.edit(name);

      const newName = "edited task";
      editPage.inputName().clear().type(newName);
      editPage.buttonSave().click();

      outlinePage.listItem(newName);
    });

    it("edit artifact dates", () => {
      const name = "task 1";
      outlinePage.add(name);
      outlinePage.edit(name);

      const isoDate = "2023-12-01";
      editPage.inputStart().type(isoDate);
      editPage.inputEnd().type(isoDate);
      editPage.buttonSave().click();

      outlinePage.listItemDates(name);
    });
  });

  describe("alternatives paths", () => {
    it("inline editing does only affects name", () => {
      const name = "task 1";
      outlinePage.add(name);
      outlinePage.edit(name);

      const isoDate = "2023-12-01";
      editPage.inputStart().type(isoDate);
      editPage.inputEnd().type(isoDate);

      editPage.buttonSave().click();

      const newName = "edited task";
      outlinePage.listItem(name).clear().type(`${newName}{enter}`);

      outlinePage.listItemDates(newName);
    });
  });
});
