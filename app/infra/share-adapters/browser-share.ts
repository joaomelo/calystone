import type { Node } from "@/domain";

import { Artifact } from "@/domain";
import { Status, throwCritical } from "@/utils";

import type { ShareAdapter } from "./share";

export class BrowserShareAdapter implements ShareAdapter {

  share(node: Node) {
    const shareable = this.shareable(node);
    shareable.throwOnFail();

    if (!(node instanceof Artifact)) throwCritical("NODE_NOT_ARTIFACT");

    const shareData = this.shareDataFrom(node);
    return navigator.share(shareData);
  }

  shareable(node: Node): Status {
    if (!("share" in navigator) || !("canShare" in navigator)) return Status.fail("SHARE_NOT_SUPPORTED");

    if (!node.isLoaded()) return Status.fail("NODE_NOT_LOADED");
    if (!(node instanceof Artifact)) return Status.fail("NODE_NOT_ARTIFACT");

    const shareData = this.shareDataFrom(node);
    const isShareableByNavigator = navigator.canShare(shareData);
    if (!isShareableByNavigator) return Status.fail("NAVIGATOR_CAN_SHARE_FALSE");

    return Status.ok();
  }

  private shareDataFrom(artifact: Artifact) {
    const binary = artifact.toBinary();
    const file = new File(
      [binary],
      artifact.name,
      {
        lastModified: artifact.lastModified,
        type: artifact.mime.media
      }
    );
    return {
      files: [file],
      title: artifact.name
    };
  }
}