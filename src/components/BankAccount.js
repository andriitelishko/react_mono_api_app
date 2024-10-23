import CardsList from "./CardsList";

function BankAccount ( {account} ) {
    return (
        <div className="box">
            <div className="title mb-3">{account.name}</div>
            {account.cards && <CardsList cards={account.cards} />}
            <div className="buttons mb-2">
                <button className="button is-info">Оновити акаунт</button>
                <button className="button is-danger">Видалити аккаунт</button>
            </div>
        </div>
    )
};

export default BankAccount