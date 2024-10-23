import { useState } from "react"

import DateRange from "./DataRange";

function Accounts ({ accounts }) {
    const [account, setAccount] = useState(null);

    const renderedOptions = accounts.map((account) => {
        return <option value={account.id} key={account.id}>{account.cardNumber}</option>
    })

    const handleSelectChange = (e) => {
            setAccount(e.currentTarget.value);
    }

    return (
        <div className="is-flex is-justify-content-space-between">
            <div className="block select is-link is-rounded is-large">
                <select id="accounts" onChange={handleSelectChange}>
                    <option value=''>Оберіть рахунок</option>
                    {renderedOptions}
                </select>
            </div>
            {account && <DateRange account={account} />}
        </div>
    )
}

export default Accounts