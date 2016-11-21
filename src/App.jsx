import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const List = ({ items, filterBy }) => {  
  return (
    <ul>
      {
        items
          .filter(item => item.indexOf(filterBy) > -1)
          .map((item, i) => <li key={i}>{item}</li>)
      }
    </ul>
  )
}

class FilterList extends Component {  
  constructor() {
    super();
    // our default state, filter by nothing
    this.state = {
      filterBy: ''
    };
  }
  // function that triggers on every change in the input box
  updateFilter(ev) {
    this.setState({ filterBy: ev.target.value });
  }
  render() {
    const { filterBy } = this.state;
    const frameworks = ['React', 'Angular', 'Vue', 'Ember'];
    // simple input box and our List component
    return (
      <div>
        <input type="text" onChange={(ev) => this.updateFilter(ev) }/>
        <List items={frameworks} filterBy={filterBy} />
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">  
          <FilterList />
        </div>
      </div>
    );
  }
}

export default App;
