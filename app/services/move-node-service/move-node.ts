import type {
  Directory,
  Node
} from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service/connect";

export class MoveNodeService {
  private readonly connectSourceService: ConnectSourceService;

  constructor(connectSourceService: ConnectSourceService) {
    this.connectSourceService = connectSourceService;
  }

  async move(options: {
    subject: Node,
    target: Directory
  }) {
    const {
      fileSystemAdapter,
      nodes
    } = this.connectSourceService.stateConnectedOrThrow();
    const {
      subject,
      target
    } = options;
    const moveable = fileSystemAdapter.moveable(subject);
    moveable.throwOnFail();
    try {
      subject.busy();
      target.busy();

      await fileSystemAdapter.move(options);
      nodes.move(options);
    } finally {
      subject.idle();
      target.idle();
    }
  }

  moveable(node: Node) {
    const { fileSystemAdapter } = this.connectSourceService.stateConnectedOrThrow();
    return fileSystemAdapter.moveable(node);
  }
}