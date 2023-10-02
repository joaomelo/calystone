import { delay } from "@shared";

export class PluginFile {
  _loadDelay = null;

  constructor({ loadDelay = null } = {}) {
    this._loadDelay = loadDelay;
  }

  async _delay() {
    if (this._loadDelay) {
      await delay(this._loadDelay);
    }
  }

  async open() {
    await this._delay();
    return {};
  }

  async close() {
    await this._delay();
  }

  async add() {
    await this._delay();
  }

  async edit() {
    await this._delay();
  }

  async del() {
    await this._delay();
  }
}
