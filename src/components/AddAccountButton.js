import { useState } from "react";

import AddAccountModal from "./AddAccountModal";

function AddAccountButton () {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    }

    const handleModalClose = () => {
        setShowModal(false);
    }

    return <div className="container p-5 is-flex">
               <div className="block mr-5">
                   <button className="button is-link is-small is-inline-flex mb-2" style={{height: 'fit-content'}} onClick={handleClick}>Додати аккаунт</button>
               </div>
               {showModal && <AddAccountModal onClose={handleModalClose}/>}
           </div>
};

export default AddAccountButton;