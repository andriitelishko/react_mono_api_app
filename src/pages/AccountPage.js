import useAccounts from "../hooks/useAccounts";

import AddAccountButton from "../components/AddAccountButton";


function AccountPage () {
    const accounts = useAccounts();

    return <>
       <h1>Accounts Page</h1>
       <AddAccountButton />
       {accounts && <pre>{JSON.stringify(accounts, null, 4)}</pre>}
    </>
}

export default AccountPage;