export function getParams(names) {
  const url = currentUrl();
  return names.map((name) => url.searchParams.get(name));
}

export function setParams(params) {
  const url = currentUrl();

  Object.entries(params).forEach(([name, value]) => {
    if (value) {
      url.searchParams.set(name, value);
    } else {
      url.searchParams.delete(name);
    }
  });

  pushUrl(url);
}

function currentUrl() {
  return new URL(window.location);
}

function pushUrl(url) {
  history.pushState({}, "", url);
}
