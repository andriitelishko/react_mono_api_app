import { useState, useEffect } from "react";
import axios from "axios";

import Error from './Error'

function DateRange ({ account }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [dates, setDates] = useState([]);
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [errorDate, setErrorDate] = useState(null);
    const [error, setError] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const BASE_URL = 'https://api.monobank.ua/personal/';

    useEffect(() => {
        const generateDates = () => {
          const today = new Date();
          const datesArray = [];
    
          for (let i = 0; i <= 31; i++) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            
            const unixTime = Math.floor(date.getTime() / 1000);
            const formattedDate = date.toLocaleDateString('uk-UA', {
              day: 'numeric',
              month: 'long',
            });
    
            datesArray.push({ value: unixTime, label: formattedDate });
          }
    
          setDates(datesArray);
        };
    
        generateDates();
      }, []);

    const buttonClass = isLoaded ? 'button is-medium has-text-centered mb-6 is-loading' : 'button is-medium has-text-centered mb-6';

    const style = {
        width: '65%'
    };

    const renderedDates = dates.map((date, i) => {
        return <option key={i} value={date.value}>{date.label}</option>
    })

    const handleChangeFrom = (e) => {
        setDateFrom(e.currentTarget.value);
        setErrorDate(null);
    }

    const handleChangeTo = (e) => {
        setDateTo(e.currentTarget.value);
    }

    const fetchTransactions = async () => {
        let result = {error: true};
        let url = `${BASE_URL}statement/${account}/${dateFrom}`;
        if (dateTo) {
            url = `${url}/${dateTo}`
        }

        try {
            const response = await axios.get(url, {
                headers: {
                    'X-Token': 'uz5jsz9mEvPxIgA6_GoLoxkZhw3TNradzVSJQIeYbDvE'
                }
            });
            result.error = false;
            result.response = response.data;
        } catch (err) {
            result.errorMessage = err.response.data.errorDescription;
        }

        return result
    }

    const handleClick = async () => {
        setIsLoaded(true)
        if (!dateFrom) {
            setErrorDate('Please select date');
        } else {
            const result = await fetchTransactions();

            if (result.error) {
                setError(result.errorMessage)
            } else {
                setTransactions(result.response);
            }
        }
        setIsLoaded(false);
    }

    const renderedTransactions = transactions.map((transaction) => {
            const transactionDate = new Date(transaction.time * 1000).toLocaleString();

            return <div className="box" key={transaction.id}>
                <p>Сума: {transaction.amount / 100}</p>
                <p>Дата: {transactionDate}</p>
                <p>Інфо: {transaction.description}</p>
            </div>
        });

    return (
        <div className="block" style={style}>
            <div className="is-flex is-justify-content-space-between">
                <div className="block select is-link is-rounded is-medium">
                    <select id="dateFrom" onChange={handleChangeFrom}>
                        <option value=''>Оберіть дату від</option>
                        {renderedDates}
                    </select>
                    {errorDate && <span className="has-text-danger">{errorDate}</span>}
                </div>
                <div className="block select is-link is-rounded is-medium">
                    <select id="dateTo" onChange={handleChangeTo}>
                        <option value=''>Оберіть дату до</option>
                        {renderedDates}
                    </select>
                </div>

                <button className={buttonClass} onClick={handleClick}>Отримати виписку</button>
            </div>
            <div className="block">
                {transactions.length > 0 && renderedTransactions}
                {error && <Error message={error} />}
            </div>
        </div>
    )
}

export default DateRange;