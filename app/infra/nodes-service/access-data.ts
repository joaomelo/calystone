import { throwError } from "@/utils";

export function assertsAccessData<T>(accessData: false | T): asserts accessData is T {
  if (accessData === false) throwError("CANNOT_ACQUIRE", "the service was not able to acquire access data");
}