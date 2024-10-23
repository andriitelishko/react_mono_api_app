class IndexedDBInitializer {
    constructor(dbName) {
        this.dbName = dbName;
        this.dbInstance = null;
    }

    async init() {
        if (this.dbInstance) {
            return this.dbInstance;
        }

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;

                if (!db.objectStoreNames.contains('providers')) {
                    db.createObjectStore('providers', { autoIncrement: true });
                }

                if (!db.objectStoreNames.contains('cards')) {
                    db.createObjectStore('cards', { autoIncrement: true });
                }

                if (!db.objectStoreNames.contains('settlements')) {
                    db.createObjectStore('settlements', { autoIncrement: true });
                }
            };

            request.onsuccess = (e) => {
                this.dbInstance = e.target.result;
                resolve(this.dbInstance);
            };

            request.onerror = (e) => {
                reject('Error initializing database: ' + e.target.errorCode);
            };
        });
    }

    getDBInstance() {
        return this.dbInstance;
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new IndexedDBInitializer('BankProvidersDB');