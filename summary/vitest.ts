interface Vitest {
  numFailedTests: number;
  numPassedTests: number;
  numTotalTests: number;
  numTotalTestSuites: number;
}

export const vitestFile = "vitest-results.json";

export function isVitest(obj: unknown): obj is Vitest {
  return typeof obj === "object"
    && obj !== null
    && "numFailedTests" in obj
    && typeof obj.numFailedTests === "number"
    && "numPassedTests" in obj
    && typeof obj.numPassedTests === "number"
    && "numTotalTests" in obj
    && typeof obj.numTotalTests === "number"
    && "numTotalTestSuites" in obj
    && typeof obj.numTotalTestSuites === "number";
}

export function vitestAsString(vitest: Vitest): string {
  return `- Unit Tests: ${vitest.numPassedTests.toFixed(0)}/${vitest.numTotalTests.toFixed(0)} passed`;
}