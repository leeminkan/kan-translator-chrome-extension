type AreaName = keyof Pick<typeof chrome.storage, "sync" | "local" | "managed">;

export class ChromeStorage {
  _area: AreaName;

  constructor(area: AreaName) {
    this._area = area;
  }

  get(key: string, defaultValue?: any) {
    const keyObj = defaultValue === undefined ? key : { [key]: defaultValue };
    return new Promise((resolve, reject) => {
      chrome.storage[this._area].get(keyObj, (items) => {
        const error = chrome.runtime.lastError;
        if (error) return reject(error);
        resolve(items[key]);
      });
    });
  }

  set(key: string, value: any) {
    return new Promise<void>((resolve, reject) => {
      chrome.storage[this._area].set({ [key]: value }, () => {
        const error = chrome.runtime.lastError;
        error ? reject(error) : resolve();
      });
    });
  }
}

export const syncStorage = new ChromeStorage("sync");
export const localStorage = new ChromeStorage("local");
