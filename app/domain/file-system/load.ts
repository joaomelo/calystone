import { Artifact, Directory, File } from "@/domain/artifact";
import { idle } from "@/utils";

export async function* load(handle: FileSystemDirectoryHandle, parent?: Directory): AsyncGenerator<Artifact> {

  for await (const entry of handle.values()) {
    await idle();

    if (entry.kind === "file") {
      const fetch = () => entry.getFile();
      const file = new File(entry.name, fetch, parent);
      yield file;
    } else {
      const directory = new Directory(entry.name, parent);
      yield directory;
      yield* load(entry, directory);
    }
  }
}
