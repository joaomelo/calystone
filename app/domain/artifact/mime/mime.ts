// mime lib is used because the browser file.type is not reliable, it is unable to offer mime types for files like markdown (*.md)
import { Mime as MimeLib } from "mime/lite";
import standardTypes from "mime/types/standard.js";

export class Mime {
  private readonly mimeMedia: string;

  constructor(name: string) {
    const mimeLib = new MimeLib(standardTypes);
    mimeLib.define({ "application/todo": ["todo"] });
    this.mimeMedia = mimeLib.getType(name) ?? "application/octet-stream";
  }

  media() {
    return this.mimeMedia;
  }

  subtype() {
    const subtype = this.mimeMedia.split("/")[1];
    return subtype;
  };

  type() {
    const type = this.mimeMedia.split("/")[0];
    return type;
  }
}
