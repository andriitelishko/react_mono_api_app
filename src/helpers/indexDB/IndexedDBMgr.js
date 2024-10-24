class IndexedDBMgr {
    constructor(initializer) {
        this.initializer = initializer;
    }

    async getObjectStore(storeName, mode = 'readonly') {
        const db = await this.initializer.getDBInstance();
        const transaction = db.transaction(storeName, mode);
        return transaction.objectStore(storeName);
    }

    async getItemByID(id, storeName) {
        try {
            const store = await this.getObjectStore(storeName, 'readwrite');
            const index = store.index('token');
            const request = index.get(id);

            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = (e) => {
                    reject('Error getting item from ' + storeName + ': ' + e.target.errorCode);
                };
            });
        } catch (error) {
            throw new Error('Error getting item from ' + storeName + ': ' + error);
        }
    }

    async saveItem(item, storeName) {
        try {
             const existingItem = await this.getItemByID(item.token, storeName);

            if (existingItem) {
                return Promise.reject(`Item with token ${item.token} already exists in ${storeName}`);
            }

            const store = await this.getObjectStore(storeName, 'readwrite');
            store.put(item);

            return new Promise((resolve, reject) => {
                store.transaction.oncomplete = () => {
                    console.log(`Item saved successfully in ${storeName}`);
                    resolve();
                };

                store.transaction.onerror = (e) => {
                    reject(`Error saving item in ${storeName}: ` + e.target.errorCode);
                };
            });
        } catch (error) {
            console.error(`Error saving item in ${storeName}: ` + error);
        }
    }

    async getItems(storeName) {
        try {
            const store = await this.getObjectStore(storeName);
            const request = store.getAll();

            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = (e) => {
                    reject(`Error getting items from ${storeName}: ` + e.target.errorCode);
                };
            });
        } catch (error) {
            throw new Error(`Error getting items from ${storeName}: ` + error);
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default IndexedDBMgr;