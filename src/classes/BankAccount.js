class BankAccount {
    constructor (id, bankID, cardNumber, iban, currency) {
        this.id = id;
        this.bankID = bankID;
        this.cardNumber = cardNumber;
        this.iban = iban;
        this.currency = currency;
        this.isActive = false;
    }

    getID () {
        return this.id;
    };

    getBankID () {
        return this.bankID;
    };

    getCardNumber () {
        return this.cardNumber;
    };

    getIban () {
        return this.iban;
    };

    getCurrency () {
        return this.currency;
    }

    getIsActive () {
        return this.isActive;
    };

    setIsActive (newVal) {
        this.isActive = newVal;
        return this.isActive;
    };
};

export default BankAccount