import { useState } from "react";

import AddAccountModal from "./AddAccountModal";
import Button from "./custom/Button";

function AddAccountButton () {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    return <>
            <Button handleClick={handleClick}>Додати аккаунт</Button>
            {showModal && <AddAccountModal onClose={handleModalClose}/>}
           </>
};

export default AddAccountButton;