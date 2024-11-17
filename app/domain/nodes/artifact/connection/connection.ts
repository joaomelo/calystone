export abstract class ArtifactConnection {
  abstract fetch(): Promise<ArrayBuffer>;
  abstract post(content: ArrayBuffer): Promise<void>;
}