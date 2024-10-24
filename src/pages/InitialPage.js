import AddAccountButton from "../components/AddAccountButton";
import Button from "../components/custom/Button";

function InitialPage () {
    return (
        <div className="container p-5 is-flex">
            <div className="block">
                <AddAccountButton />
                <Button>Обновити виписки</Button>
            </div>
            <div className="fixed-grid has-3-cols p-3" style={{width: 'inherit'}}>
                <div className="grid">
                    <div className="block cell has-text-centered is-col-span-2">
                        <div>Немає данних по випискам</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InitialPage;