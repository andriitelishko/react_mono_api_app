import { useState } from "react";
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

    const navigate = useNavigate();
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
            setError(configs.errors.EMPTY_FIELDS);
            return;
        }

        const provider = ProviderMgr.getProvider('mono', {
            token: accountID,
            name: accountName
        });
        if (!provider) {
            setError(configs.errors.BAD_PROVIDER);
            return;
        }

        setAccountsLoading(true);
        const newAccounts = await provider.getAccounts();

        if (!newAccounts) {
            setAccountID("");
            setError(configs.errors.BAD_ACCOUNT);
            setAccountsLoading(false);
            return;
        }

        const newBankAccount = {
            name: accountName,
            token: accountID,
            provider: 'mono',
        }

        try {
            await db.saveItem(newBankAccount, 'providers');
            setAccountsLoading(false);
            onClose();
            navigate('/accounts');
        } catch (error) {
            setError(configs.errors.ACCOUNT_EXISTS);
            console.error(error)
            setAccountsLoading(false);
        }
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