// mime lib is used because the browserr file.type is not reliable, it is unable to offer mime types for files like markdown (*.md)
import mime from "mime";

export function solve(name: string): string {
  const type = mime.getType(name);
  return type ?? "application/octet-stream";
}