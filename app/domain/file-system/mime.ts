// mime lib is used because the browserr file.type is not reliable, it is unable to offer mime types for files like markdown (*.md)
import mime from "mime";

export function solveMime(name: string) {
  return mime.getType(name) ?? "application/octet-stream";
}