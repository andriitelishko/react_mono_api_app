import "bulma/css/bulma.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import InitialPage from "./pages/InitialPage";
import AccountPage from "./pages/AccountPage";

function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<InitialPage />} />
                <Route path="/accounts" element={<AccountPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;