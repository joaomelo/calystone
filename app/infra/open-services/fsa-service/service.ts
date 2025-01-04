export class FsaService {
  async openDirectory() {
    const dir = await showDirectoryPicker();
    return dir;
  }

  supports() {
    if (typeof self === "undefined") return false;
    return ("showOpenFilePicker" in self);
  }
}
