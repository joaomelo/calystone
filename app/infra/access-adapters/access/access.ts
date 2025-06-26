export interface AccessAdapter<AccessData> {
  request(): Promise<AccessData>;
}