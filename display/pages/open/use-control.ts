export function useControl() {
  const control = {
    dispatch: {
      connect,
      open,
    }
  };

  return control;
}

function open(handle: FileSystemDirectoryHandle) {
  console.log(handle);
}

function connect() {
  console.log("connect");
}