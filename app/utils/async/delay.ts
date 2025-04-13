type DefaultMilliseconds = number;
interface Milliseconds { milliseconds: number}
type Options = DefaultMilliseconds | Milliseconds | Seconds;
interface Seconds { seconds: number}

export async function delay(options: Options): Promise<void> {
  const milliseconds = typeof options === "number"
    ? options
    : ("milliseconds" in options)
      ? options.milliseconds
      : options.seconds * 1000;

  await new Promise(resolve => setTimeout(resolve, milliseconds));
}