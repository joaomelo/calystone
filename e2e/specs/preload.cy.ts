import { openMacros, pageNodes } from "../helpers";

describe("preload", () => {
  beforeEach(() => {
    openMacros.openMemory();
  });

  it("auto starts preload", () => {
    pageNodes.preloading().should("exist");
  });
});
