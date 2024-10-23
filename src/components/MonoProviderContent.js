import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Error from "./Error";
import ProviderMgr from "../helpers/ProviderMgr";
import configs from "../util/configs"
import useDB from "../hooks/useDB";

function MonoProviderContent ({ onClose }) {
    const [accountName, setAccountName] = useState('');
    const [accountID, setAccountID] = useState('');
    const [error, setError] = useState(null);
    const [accountsLoading, setAccountsLoading] = useState(false);
    // const [dbManager, setDbManager] = useState(null)

    const navigate = useNavigate();

    // useEffect(() => {
    //     const initDB = async () => {
    //         return await useDB();
    //     }
    // }, [])

    const db = useDB();

    const handleInputChange = (e, input) => {
        setError(null);

        if (input === "name") {
            setAccountName(e.currentTarget.value)
        } else {
            setAccountID(e.currentTarget.value)
        }
    }

    const handleAccountNameChange = e => handleInputChange(e, "name");
    const handleAccountIDChange = e => handleInputChange(e, "id");

    const accountNameInputClasses = error && !accountName ? 'input is-normal is-danger mb-3' : 'input is-normal mb-3';
    const accountIDInputClasses = error && !accountID ? 'input is-normal is-danger mb-3' : 'input is-normal mb-3';

    const submitButtonClasses = accountsLoading ? 'button is-link is-block mx-auto mb-2 is-loading' : 'button is-link is-block mx-auto mb-2';

    const handleErrorClose = () => {
        setError(null);
        setAccountID('');
    }

    const handleAccountAdding = async () => {
        if (!accountName || !accountID) {
            setError(configs.ERRORS.EMPTY_FIELDS);
            return;
        }

        let params;
        params = {
            token: accountID,
            name: accountName,
            providerID: 'mono',
        }

        const provider = ProviderMgr.getProvider('mono', params);
        if (!provider) {
            setError(configs.ERRORS.BAD_PROVIDER);
            return;
        }

        setAccountsLoading(true);
        const newAccounts = await provider.getAccounts();

        if (!newAccounts) {
            setAccountID("");
            setError(configs.ERRORS.BAD_ACCOUNT);
            setAccountsLoading(false);
            return;
        }

        const newBankAccount = {
            name: accountName,
            token: accountID,
            provider: 'mono',
            cards: newAccounts
        }

        setAccountsLoading(false);
        onClose();
        navigate('/accounts');
    };

    return (
        <div className="box">
            <input className={accountNameInputClasses} type="text" value={accountName} placeholder="Назва аккаутну" onChange={handleAccountNameChange} />
            <input className={accountIDInputClasses} type="text" value={accountID} placeholder="Токет аккаутну" onChange={handleAccountIDChange} />
            <button className={submitButtonClasses} onClick={handleAccountAdding}>Додати</button>
            {error && <Error message={error} hideError={handleErrorClose} />}
        </div>
    )
};

export default MonoProviderContent;