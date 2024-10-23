import { useState } from 'react';
import axios from 'axios';

import Accounts from './Accounts'
import Error from './Error'

function AccountInfo () {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [provider, setProvider] = useState(null);

    const showAccounts = accounts.length > 0;
    const BASE_URL = 'https://api.monobank.ua/personal/';

    const buttonClass = isLoaded ? 'button is-medium has-text-centered is-loading' : 'button is-medium has-text-centered';

    const fetchAccounts = async () => {
        let result = {error: true};
        const url = `${BASE_URL}client-info`

        try {
            const response = await axios.get(url, {
                headers: {
                    'X-Token': 'uz5jsz9mEvPxIgA6_GoLoxkZhw3TNradzVSJQIeYbDvE'
                }
            });
            result.error = false;
            result.response = response.data;
        } catch (err) {
            result.errorMessage = err.response.data.errorDescription;
        }

        return result
    }

    const handleOnClick = async () => {
        setIsLoaded(true);
        const result = await fetchAccounts();

        if (result.error) {
            setError(result.errorMessage)
        } else {
            let accounts = [];

            result.response.accounts.forEach((account) => {
                let accountObj = {};
                accountObj.id = account.id;
                accountObj.cardNumber = account.maskedPan;

                accounts.push(accountObj);
            })

            setAccounts(accounts);
        }

        setIsLoaded(false);
    }

    return (
        <div className='block'>
            <div className="has-text-centered block">
              <button className={buttonClass} onClick={handleOnClick}>Отримати рахунки</button>
            </div>
            <div className='block'>
                {showAccounts && <Accounts accounts={accounts} />}
                {error && <Error message={error} />}
            </div>
        </div>
    )
}

export default AccountInfo;