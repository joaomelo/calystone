import { outlinePage, signUpPage, tagsModal, tagsPage } from "./shared";

describe("tags artifacts", () => {
  beforeEach(() => {
    cy.clearData();
    signUpPage.signUpAuto();
    tagsPage.sideTags().click();
  });

  it("linked artifacts appear in tag artifacts page", () => {
    const myTag = "my tag";
    tagsPage.add(myTag);

    tagsPage.sideOutline().click();
    const taskOne = "task one";
    const taskTwo = "task two";
    outlinePage.add(taskOne);
    outlinePage.add(taskTwo);

    outlinePage.listItemMenuTags(taskOne);
    tagsModal.link(myTag);

    outlinePage.listItemMenuTags(taskTwo);
    tagsModal.link(myTag);

    tagsPage.sideTags().click();
    tagsPage.artifacts(myTag);

    cy.contains(taskOne);
    cy.contains(taskTwo);
  });

  it("tag artifacts page is reachable from tags chips", () => {
    const myTag = "my tag";
    tagsPage.add(myTag);

    tagsPage.sideOutline().click();
    const taskOne = "task one";
    const taskTwo = "task two";
    outlinePage.add(taskOne);
    outlinePage.add(taskTwo);

    outlinePage.listItemMenuTags(taskOne);
    tagsModal.link(myTag);

    outlinePage.listItemMenuTags(taskTwo);
    tagsModal.link(myTag);

    outlinePage.detailsTag(taskOne, myTag).click();

    cy.contains(taskOne);
    cy.contains(taskTwo);
  });
});
