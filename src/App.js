import React, { Component } from 'react';
import Moment from 'moment';
import Week from './Week';
import './App.css';

const localDrinkDataKey = "drink-data";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChangeDrinksForDay = this.handleChangeDrinksForDay.bind(this);

    const now = Moment();
    let data = JSON.parse(localStorage.getItem(localDrinkDataKey), (key, value) => 
      key === "date" ? Moment(value) : value
    );


    if (!data || data.length === 0) {
      data = [{
        date: now.clone().startOf('week'),
        drinks: 0,
      }];
    }

    function getLastDate() {
      return data[data.length-1].date;
    }

    while(getLastDate().diff(now, 'days') < 0) {
      data.push({
        date: getLastDate().clone().add(1, 'days'),
        drinks: 0,
      });
    }

    this.state = {
      drinksData: data,
    };
    
    localStorage.setItem(localDrinkDataKey, JSON.stringify(this.state.drinksData));
  }
  handleChangeDrinksForDay(date, drinks) {
    function datesAreEqual(date1, date2) {
      return date1.diff(date2, 'days') === 0;
    } 

    this.setState(state => ({
      drinksData: state.drinksData.map(day => datesAreEqual(day.date, date) ? { date, drinks }: day),
    }),
    () => {
      localStorage.setItem(localDrinkDataKey, JSON.stringify(this.state.drinksData));
    });
  }
  render() {
    const weeks = [];
    const daysInWeek = 7;
    const drinksData = this.state.drinksData;
    for (let i = 0; i < drinksData.length; i += daysInWeek) {
      weeks.push(<Week key={i} days={drinksData.slice(i, i+daysInWeek)} onChangeDrinksForDay={this.handleChangeDrinksForDay} />)
    }
    
    return (
      <div className="app">
        {weeks}
      </div>
    );
  }
}

export default App;
