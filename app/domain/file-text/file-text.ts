import type { File } from "@/domain/file";

export interface FileText extends File {
  mime: TextMime;
}

export type TextMime = `text/${string}`;
