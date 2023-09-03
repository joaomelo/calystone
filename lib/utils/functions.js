export function and(...fns) {
  return (x) => fns.every((fn) => fn(x));
}

export function pipe(...fns) {
  return (x) => fns.reduce((v, fn) => fn(v), x);
}

// adapted from https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
export function getParamNames(func) {
  const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
  const ARGUMENT_NAMES = /([^\s,]+)/g;

  const fnStr = func.toString().replace(STRIP_COMMENTS, "");
  const result = fnStr
    .slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")"))
    .match(ARGUMENT_NAMES);
  return result || [];
}
