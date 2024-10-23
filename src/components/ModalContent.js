import { useState } from "react";

import MonoProviderContent from "./MonoProviderContent";

function ModalContent ({ onClose }) {
    const [selectedAccount, setSelectedAccount] = useState("");

    const handleSelectChange = (e) => {
        setSelectedAccount(e.target.value)
    }

    let providerContent = "";
    if (selectedAccount === 'mono') {
        providerContent = <MonoProviderContent onClose={onClose} />
    }

    return (
        <div className="p-6 has-text-centered">
            <div className="title is-3">Додати аккаунт</div>
            <div className="select is-link mb-4 is-inline-block">
                <select onChange={handleSelectChange}>
                    <option value="">Виберіть провайдер</option>
                    <option value="mono">Mono</option>
                </select>
            </div>
            {providerContent}
        </div>
    )
}

export default ModalContent;