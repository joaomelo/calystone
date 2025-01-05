import { throwCritical } from "@/utils";

export abstract class BaseAccessService<T> {
  access(): Promise<T> {
    if (!this.active()) throwCritical("ACCESS_SERVICE_NOT_ACTIVE", "access service is not active");

    return this.performAccess();
  }

  abstract active(): boolean;

  abstract performAccess(): Promise<T>;
}