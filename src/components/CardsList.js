import Card from "./Card";

function CardsList ({ cards }) {
    const renderedCards = cards.map((card) => {
        return <div key={card.getID()}>
            <Card card={card} />
        </div>
    })

    return <div className="checkboxes mb-3">{ renderedCards }</div>
};

export default CardsList;