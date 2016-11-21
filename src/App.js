import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux';

// ACTION CREATORS
function setFilter(by) {
  return { type: 'SET_FILTER', by};
}

// REDUCER
const initialState = {
  filterBy: ''
}

function reducer(state = initialState, action){
  switch (action.type) {
    case 'SET_FILTER':
      return Object.assign({}, state, {
        filterBy: action.by
      })
  
    default:
      return state
  }
}

// STORE
const store = createStore(reducer);

// 
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
    // default state
    this.state = store.getState();
    // function that will execute every time the state changes
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
  });
}
  // function that triggers on every change in the input box
  updateFilter(ev) {
    store.dispatch(setFilter(ev.target.value));
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
