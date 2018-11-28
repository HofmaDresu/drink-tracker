import React from 'react';
import Day from './Day';
import './Week.css';

export default function Week(props) {
    const drinks = props.days.reduce((acc, d) => acc + d.drinks, 0);
    const weekDrinkHealth = (drinks >= 14 ? "bad" : drinks > 10 ? "moderate" : "good");
    const weekClasses = ["week", weekDrinkHealth].join(" ");
    const weekTotalClasses = ["week-total", weekDrinkHealth].join(" ");

    const dayComponents = props.days.map(d => <Day day={d} key={d.date} onChangeDrinks={(drinks) => props.onChangeDrinksForDay(d.date, drinks)} />);
    return (
        <div className="week-container">
            <div className={weekClasses}>
                {dayComponents}
            </div>
            <span className={weekTotalClasses}>
                Total: {drinks} drinks
            </span>
        </div>
    );
}