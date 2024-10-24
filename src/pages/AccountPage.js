import useAccounts from "../hooks/useAccounts";

import AddAccountButton from "../components/AddAccountButton";


function AccountPage () {
    const accounts = useAccounts();

    return <>
       <h1>Accounts Page</h1>
       <AddAccountButton />
    </>
}

export default AccountPage;