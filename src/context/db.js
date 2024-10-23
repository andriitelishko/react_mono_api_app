import { createContext, useState } from "react";

const DBContext = createContext();

function Provider ({ children }) {
    const [ dbMgr, setDBMgr ] = useState(null);

    const saveDB = (db) => {
        setDBMgr(db)
    }

    return (
        <DBContext.Provider value={{
            dbMgr,
            saveDB
        }}>
            { children }
        </DBContext.Provider>
    )
}

export { Provider }
export default DBContext;