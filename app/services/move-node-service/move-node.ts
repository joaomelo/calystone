import type {
  Directory,
  Node
} from "@/domain";
import type { ConnectSourceService } from "@/services/connect-source-service";
import type { SpawnCollectionsService } from "@/services/spawn-collections-service";

export class MoveNodeService {
  private readonly connectSourceService: ConnectSourceService;
  private readonly spawnCollectionsService: SpawnCollectionsService;

  constructor({
    connectSourceService,
    spawnCollectionsService
  }: {
    connectSourceService: ConnectSourceService,
    spawnCollectionsService: SpawnCollectionsService
  }) {
    this.connectSourceService = connectSourceService;
    this.spawnCollectionsService = spawnCollectionsService;
  }

  private inject() {
    const { fileSystemAdapter } = this.connectSourceService.stateConnectedOrThrow();
    const mover = this.spawnCollectionsService.mover();
    return {
      fileSystemAdapter,
      mover
    };
  }

  async move(options: {
    subject: Node,
    target: Directory
  }) {
    const {
      subject,
      target
    } = options;

    const moveable = this.moveable(options);
    moveable.throwOnFail();

    try {
      subject.busy();
      target.busy();

      const {
        fileSystemAdapter,
        mover
      } = this.inject();
      await fileSystemAdapter.move(options);
      mover.move(options);
    } finally {
      subject.idle();
      target.idle();
    }
  }

  moveable({
    subject,
    target
  }: {
    subject: Node,
    target?: Directory
  }) {
    const {
      fileSystemAdapter,
      mover
    } = this.inject();

    const moveableInfra = fileSystemAdapter.moveable(subject);
    if (!target) return moveableInfra;

    const moveableDomain = mover.moveable({
      subject,
      target
    });
    return moveableInfra.merge(moveableDomain);
  }
}