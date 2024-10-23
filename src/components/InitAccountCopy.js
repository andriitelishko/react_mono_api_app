import { useState, useEffect } from "react";

import Error from "./Error";

import MonoProvider from "../providers/MonoProvider";
import IndexedDBMgr from "../helpers/IndexedDBMgr";

function InitAccount () {
    const [accountName, setAccountName] = useState('');
    const [accountID, setAccountID] = useState('');
    const [error, setError] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [provider, setProvider] = useState(null);
    const [accountsLoading, setAccountsLoading] = useState(false);

    const ERRORS = {
        EMPTY_FIELDS: "Заповніть обов'язкові поля",
        BAD_ACCOUNT: "Не вірний номер аккаунту"
    }

    const INPUTS = {
        NAME: 'name',
        ID: 'id'
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!accountName || !accountID) {
            setError(ERRORS.EMPTY_FIELDS);
        }

        const Provider = new MonoProvider(accountID, accountName);

        setAccountsLoading(true);
        const accountsResponse = await Provider.getAccounts();
        if (accountsResponse.error) {
            setError(ERRORS.BAD_ACCOUNT + accountsResponse.errorMessage)
        } else {
            const accountItems = accountsResponse.response.accounts.map((account) => {
                return {
                    id: account.id,
                    bankAccountID: accountsResponse.response.clientId,
                    name: account.maskedPan[0],
                    iban: account.iban,
                    currency: account.currencyCode
                }
            })

            setAccounts(accountItems);
            setAccountID('');
            setAccountName('');
        }

        setAccountsLoading(false);
        setProvider(Provider);
    }

    const handleInputChange = (e, input) => {
        setError(null);

        if (input === INPUTS.NAME) {
            setAccountName(e.currentTarget.value)
        } else {
            setAccountID(e.currentTarget.value)
        }
    }

    const renderedAccountItems = () => {
        if (!accounts) {
            return;
        }

        return accounts.map((account) => {
            return (
                <div className="field mr-5" key={account.id}>
                    <label className="control">
                        <input value={account.name} type="checkbox" className="mr-2"/>
                        {account.name}
                    </label>
                </div>
            )
        })
    }

    const handleAccountNameChange = e => handleInputChange(e, INPUTS.NAME);
    const handleAccountIDChange = e => handleInputChange(e, INPUTS.ID);

    const accountNameInputClasses = error && !accountName ? 'input is-normal is-danger' : 'input is-normal';
    const accountIDInputClasses = error && !accountID ? 'input is-normal is-danger' : 'input is-normal';
    const submitButtonClasses = accountsLoading ? 'button is-link is-loading' : 'button is-link';

    const handleErrorClose = () => {
        setError(null);
        setAccountName('');
        setAccountID('');
    }

    return (
        <div className="container mt-5 mb-5 is-flex">
            <div className="box has-text-centered is-inline-block mr-6">
                <div className="subtitle is-2">Додайте акаутн</div>
                <form onSubmit={handleFormSubmit}>
                    <div className="field">
                        <div className="control">
                            <input className={accountNameInputClasses} value={accountName} placeholder="Введіть назву для аккаунту" onChange={handleAccountNameChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <input className={accountIDInputClasses} value={accountID} placeholder="Введіть номер аккауниу" onChange={handleAccountIDChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className={submitButtonClasses}>Додати</button>
                        </div>
                    </div>
                    {error && <Error message={error} hideError={handleErrorClose} />}
                </form>
            </div>
            {accounts && <div className="box has-text-centered is-inline-block">
                    <div className="is-flex mb-5">{renderedAccountItems()}</div>
                    <button className="button is-link is-outlined">Отримати виписки</button>
                </div>}
        </div>
    )
}

export default InitAccount;