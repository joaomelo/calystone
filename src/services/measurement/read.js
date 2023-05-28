export async function readMeasurement(id) {
  return {
    id,
    created: new Date(),
    metrics: [],
  };
}
