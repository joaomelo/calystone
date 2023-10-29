export interface UseCase {
  readonly name: string;
  is: (name: string) => boolean;
}
