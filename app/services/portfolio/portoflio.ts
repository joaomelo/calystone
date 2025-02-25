import type { AdaptersPortfolio } from "@/services/adapters";
import type { OpenerService } from "@/services/opener-service";

import { Nodes } from "@/domain";
import { ConnectionService } from "@/services/connection-service";
import { ConnectedOpenerService, NullOpenerService } from "@/services/opener-service";
import { RequestService } from "@/services/request-service";
import { ConnectedTextService, NullTextService, type TextService } from "@/services/text-service";

export class ServicesPortolfio {
  connection: ConnectionService;
  nodes: Nodes;
  opener: OpenerService;
  request: RequestService;
  text: TextService;

  constructor(adaptersPortfolio: AdaptersPortfolio) {
    this.nodes = new Nodes();
    this.request = new RequestService(adaptersPortfolio);
    this.connection = new ConnectionService({ adaptersPortfolio, nodes: this.nodes });
    this.opener = new NullOpenerService();
    this.text = new NullTextService();
    this.observeConnection();
  }

  observeConnection() {
    this.connection.status.subscribe((options) => {
      this.opener = options.value === "connected"
        ? new ConnectedOpenerService({ fileSystemAdapter: options.fileSystemAdapter, nodes: this.nodes })
        : new NullOpenerService();

      this.text = options.value === "connected"
        ? new ConnectedTextService(options.fileSystemAdapter)
        : new NullTextService();
    });
  }
}
