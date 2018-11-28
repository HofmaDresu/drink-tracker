import React, {Component} from 'react';
import './Day.css';

export default class Day extends Component {
    constructor(props) {
        super(props);
        this.editDrinks = this.editDrinks.bind(this);
    }
    editDrinks() {
        const day = this.props.day;
        let stringDrinks = prompt(`How many drinks did you have on ${day.date.format("MM-DD-YY")}?`, day.drinks);
        const parsedDrinks = parseInt(stringDrinks);

        if(!isNaN(parsedDrinks)) {
            this.props.onChangeDrinks(parsedDrinks);
        }
    }
    render() {
        const drinks = this.props.day.drinks;
        const dayDrinkHealth = drinks > 4 ? "bad" : drinks > 2 ? "moderate" : "good";
        const drinkClasses = ["day", dayDrinkHealth].join(" ");
        return (
        <div className={drinkClasses} onClick={this.editDrinks}>
            <div className="date">{this.props.day.date.format("MM-DD-YY")}</div>
            <div className="drinks">{drinks}</div>
        </div>
        );
    }
}