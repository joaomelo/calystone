import { Status } from "@/utils";

import type { AvailabilityAdapter } from "./availability";

export class FsaAvailabilityAdapter implements AvailabilityAdapter {
  available(): Status {
    if (typeof self === "undefined") return Status.fail("SELF_UNDEFINED");
    if (!("showOpenFilePicker" in self)) return Status.fail("SHOW_OPEN_FILE_PICKER_NOT_SUPPORTED");
    return Status.ok();
  }
}
