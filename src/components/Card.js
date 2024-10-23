function Card ( {card} ) {
    const id = card.getID();
    const cardNumber = card.getCardNumber();

    return <label className="checkbox">
        <input type="checkbox" className="mr-2" value={id} />
        {cardNumber}
    </label>
};

export default Card