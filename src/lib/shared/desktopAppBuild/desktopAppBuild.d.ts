interface Window {
  electron: {
    ipcRenderer: {
      send: (channel: string, ...data: unknown[]) => vwoid;
      on: <T = unknown[]>(channel: string, handler: (e: unknown, ...data: T) => void) => void;
    };
  };
}
