import axios from 'axios';

import Account from '../classes/Account';

class MonoProvider {
    #baseURL;

    constructor(token, name) {
        this.token = token;
        this.name = name;
        this.providerID = 'mono';
        this.#baseURL = 'https://api.monobank.ua/personal/';
    }

    async getAccounts() {
        const url = `${this.#baseURL}client-info`;
        let accounts;

        try {
            const response = await axios.get(url, {
                headers: {
                    'X-Token': this.token
                }
            });
            accounts = response.data.accounts.map((account) => {
                const { clientId } = response.data;
                const { id, iban, currencyCode } = account;
                const cardNumber = account.maskedPan[0];

                return new Account(id, clientId, cardNumber, iban, currencyCode);
            })
        } catch (err) {
            accounts = null;
        }

        return accounts;
    }

    getStatements() {
        console.log("Отримання виписок...");
    }
}

export default MonoProvider;