
import AddAccountButton from "../components/AddAccountButton";

function InitialPage () {
    return (
        <div className="container p-5 is-flex">
            <div className="block" style={{width: '100%'}}>
                <div className="fixed-grid has-3-cols p-3">
                    <div className="grid">
                        <div className="block cell is-col-span-2 has-text-centered">
                            <div>Немає данних по випискам</div>
                        </div>
                    </div>
                </div>
            </div>
            <AddAccountButton />
        </div>
    )
}

export default InitialPage;