import { useState, useEffect } from "react";

import IndexedDBInitializer from "../helpers/indexDB/IndexDBInitializer"
import IndexedDBMgr from "../helpers/indexDB/IndexedDBMgr"

function useDB() {
    const [db, setDB] = useState(null);

    useEffect(() => {
        const dbInitializer = IndexedDBInitializer;
    dbInitializer.init().then(() => {
        setDB(new IndexedDBMgr(dbInitializer))
    });
    }, [])
    
    return db;
};

export default useDB;