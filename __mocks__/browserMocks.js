class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }
}

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
});

class PerformanceMock {
  constructor() {
    this.store = {
      resource: [],
    };
  }

  setResourceEntries(url) {
    this.store.resource.push({
      name: url.trim(),
      duration: 450,
    });
  }

  getEntriesByType(type) {
    return this.store[type];
  }
}

Object.defineProperty(window, 'performance', {
  value: new PerformanceMock(),
});
