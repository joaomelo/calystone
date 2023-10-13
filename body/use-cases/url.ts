export function getParams(names: string[]) {
  const url = currentUrl();
  return names.map((name) => url.searchParams.get(name));
}

export function setParams(params: Record<string, string>) {
  const url = currentUrl();

  Object.entries(params).forEach(([name, value]) => {
    if (value) {
      url.searchParams.set(name, value);
    } else {
      url.searchParams.delete(name);
    }
  });

  history.pushState({}, "", url.toString());
}

function currentUrl() {
  return new URL(window.location.toString());
}
