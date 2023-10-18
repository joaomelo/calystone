import type { Option, Value } from "../shared";

export type CollapseStatus = "flat" | "open" | "closed";

export type Item = Option & {
  actions?: Option[];
  children?: Item[];
};

export type ItemAction = {
  action: Value;
  item: Value;
};
