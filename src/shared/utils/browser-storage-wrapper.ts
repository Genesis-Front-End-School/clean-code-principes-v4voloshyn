/* eslint-disable no-console */
class StorageWrapper {
  private storage?: Storage;

  constructor(type: 'local' | 'session') {
    try {
      this.storage =
        type === 'local' ? window.localStorage : window.sessionStorage;
    } catch (error) {
      console.error(error);
    }
  }

  get length() {
    if (!this.storage) return undefined;

    return this.storage.length;
  }

  get<T>(key: string) {
    if (!this.storage) return undefined;

    try {
      const value = this.storage.getItem(key);

      if (value === null) {
        return null;
      }

      return JSON.parse(value) as T;
    } catch (error) {
      throw Error('Storage is not available');
    }
  }

  set<T>(key: string, value: T) {
    if (!this.storage) return;

    try {
      const stringValue = JSON.stringify(value);

      this.storage.setItem(key, stringValue);
    } catch (error) {
      throw Error('Something went wrong on ".set"');
    }
  }

  remove(key: string) {
    if (!this.storage) return;

    this.storage.removeItem(key);
  }

  clear() {
    if (!this.storage) return;

    this.storage.clear();
  }
}

export const localStorageWrapper = new StorageWrapper('local');
export const sessionStorageWrapper = new StorageWrapper('session');
