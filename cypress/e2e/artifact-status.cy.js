import { outlinePage, signUpPage } from "./shared";

describe("artifact status from the outline", () => {
  const parentName = "task 1";
  const childName = "task 1.1";

  beforeEach(() => {
    cy.clearData();
    signUpPage.signUpAuto();

    outlinePage.add(parentName);
    outlinePage.appendUnder(parentName);
    outlinePage.listItemChildOf(parentName).type(`${childName}{enter}`);
  });

  it("completes artifact descendants", () => {
    outlinePage.complete(parentName);

    outlinePage.listItemCompletedTag(parentName);
    outlinePage.listItemCompletedTag(childName);
  });

  it("cancels an artifact descendants", () => {
    outlinePage.cancel(parentName);

    outlinePage.listItemCancelledTag(parentName);
    outlinePage.listItemCancelledTag(childName);
  });

  it("reactivates artifact ascendants after their finished", () => {
    outlinePage.complete(childName);
    outlinePage.cancel(parentName);
    outlinePage.listItemCancelledTag(parentName);
    outlinePage.listItemCompletedTag(childName);

    outlinePage.activate(childName);

    outlinePage.listItemCancelledTag(parentName).should("not.exist");
    outlinePage.listItemCompletedTag(childName).should("not.exist");
  });
});
