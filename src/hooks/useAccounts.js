// import IndexedDBInitializer from "../helpers/indexDB/IndexDBInitializer"
// import IndexedDBMgr from "../helpers/indexDB/IndexedDBMgr"
import useDB from "./useDB";
import { useState } from "react";

function useAccounts () {
    // const dbInitializer = IndexedDBInitializer;
    // await dbInitializer.init();
    // const dbManager = new IndexedDBMgr(dbInitializer);
    const [accounts, setAccounts] = useState(null);
    const db = useDB();

    if (db) {
        db.getItemByID(1, 'providers').then((account) => {
            setAccounts([account])
        });
    }

    return accounts
};

export default useAccounts;