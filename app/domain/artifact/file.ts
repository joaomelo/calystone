import type { Directory } from "./directory";

import { Artifact } from "./artifact";

type Fetch = () => Promise<Blob>;

export class File extends Artifact {
  private content: Blob | null = null;
  private dataSourceFetch: Fetch;

  constructor(name: string, fetch: Fetch, parent?: Directory) {
    super(name, parent);
    this.dataSourceFetch = fetch;
  }

  async fetch(): Promise<Blob> {
    if (!this.content) {
      this.content = await this.dataSourceFetch();
    }
    return this.content;
  }
};
