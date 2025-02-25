import type { AdaptersPortfolio } from "@/services/adapters";

import { Nodes } from "@/domain";
import { ConnectionService } from "@/services/connection-service";
// import { Opener } from "../opener-service/opener";
import { RequestService } from "@/services/request-service";

export class ServicesPortolfio {
  connection: ConnectionService;
  nodes: Nodes;
  request: RequestService;
  // opener: Opener;

  constructor(adaptersPortfolio: AdaptersPortfolio) {
    this.nodes = new Nodes();
    this.request = new RequestService(adaptersPortfolio);
    this.connection = new ConnectionService({ adaptersPortfolio, nodes: this.nodes });
    // this.opener = new Opener(this);
  }

}
