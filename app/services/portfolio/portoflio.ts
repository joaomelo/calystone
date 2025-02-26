import type { AdaptersPortfolio } from "@/services/adapters";
import type { ObserverOptions } from "@/services/connection-service";
import type { OpenerService } from "@/services/opener-service";
import type { RenamerService } from "@/services/renamer-service/renamer";
import type { TextService } from "@/services/text-service";

import { Nodes } from "@/domain";
import { ConnectionService } from "@/services/connection-service";
import { ConnectedOpenerService, NullOpenerService } from "@/services/opener-service";
import { ConnectedRenamerService, NullRenamerService } from "@/services/renamer-service";
import { RequestService } from "@/services/request-service";
import { ConnectedTextService, NullTextService } from "@/services/text-service";

export class ServicesPortolfio {
  adaptersPortfolio: AdaptersPortfolio;
  connection: ConnectionService;
  nodes: Nodes;
  opener: OpenerService;
  renamer: RenamerService;
  request: RequestService;
  text: TextService;

  constructor(adaptersPortfolio: AdaptersPortfolio) {
    this.adaptersPortfolio = adaptersPortfolio;

    this.nodes = new Nodes();
    this.request = new RequestService(adaptersPortfolio);
    this.connection = new ConnectionService({ adaptersPortfolio, nodes: this.nodes });

    this.opener = new NullOpenerService();
    this.text = new NullTextService();
    this.renamer = new NullRenamerService();

    this.connection.status.subscribe((options) => { this.rotateServices(options); });
  }

  rotateServices(options: ObserverOptions) {
    if (options.value === "disconnected" ) {
      this.opener = new NullOpenerService();
      this.text = new NullTextService();
      this.renamer = new NullRenamerService();
      return;
    }

    const sourceAdapter = this.adaptersPortfolio.get(options.source);
    const fileSystemAdapter = sourceAdapter.getOrThrowFileSystemAdapter();
    const supportAdapter = sourceAdapter.getSupport();
    const nodes = this.nodes;

    this.opener = new ConnectedOpenerService({ fileSystemAdapter, nodes });
    this.text = new ConnectedTextService(fileSystemAdapter);
    this.renamer = new ConnectedRenamerService({ fileSystemAdapter, nodes, supportAdapter });
  };
}
