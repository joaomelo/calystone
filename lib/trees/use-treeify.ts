import type { Id, WithId } from "@lib/ids";

export function useTreeify<T extends WithId>(items: Map<Id, T>);