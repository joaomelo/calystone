export class PluginFile {
  _handle;

  async open(handle) {
    this._handle = handle;
    const file = await this._handle.getFile();
    const text = await file.text();
    const json = JSON.parse(text);
    return json;
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
