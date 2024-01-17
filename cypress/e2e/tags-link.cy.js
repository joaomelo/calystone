import { outlinePage, signUpPage, tagsModal, tagsPage } from "./shared";

describe("tags link", () => {
  beforeEach(() => {
    cy.clearData();
    signUpPage.signUpAuto();
    tagsPage.sideTags().click();
  });

  it("links multiple tags with an artifact", () => {
    const tagOne = "tag one";
    const tagTwo = "tag two";
    tagsPage.add(tagOne);
    tagsPage.add(tagTwo);

    tagsPage.sideOutline().click();
    const task = "task";
    outlinePage.add(task);

    outlinePage.listItemMenuTags(task);
    tagsModal.link([tagOne, tagTwo]);

    outlinePage.detailsTag(tagOne);
    outlinePage.detailsTag(tagTwo);
  });

  it("unlinks previous linked tag from artifact", () => {
    const tagOne = "tag one";
    tagsPage.add(tagOne);

    tagsPage.sideOutline().click();
    const task = "task";
    outlinePage.add(task);

    outlinePage.listItemMenuTags(task);
    tagsModal.link(tagOne);
    outlinePage.detailsTag(tagOne).should("exist");

    outlinePage.listItemMenuTags(task);
    tagsModal.link([]);

    outlinePage.detailsTag(tagOne).should("not.exist");
  });
});
