import type { Nodes } from "@/domain";

import { defaultActivity } from "@/display/activities";
import { Store } from "@/display/store";
import { useExceptionToast } from "@/display/widgets";
import { Exception } from "@/utils";
import { useRouter } from "vue-router";

type Connect = (nodes: Nodes) => void;

export function useOpen(connect: Connect) {
  const router = useRouter();
  const state = Store.use();
  const toast = useExceptionToast();
  return () => {
    try {
      connect(state.nodes);
      void router.push({ name: defaultActivity });
    } catch (error) {
      const exception = new Exception("UNABLE_OPEN", error);
      toast(exception);
    }
  };
}
