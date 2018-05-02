import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      items: []
    }
  }
  componentDidMount() {
    // This is called after the first render
    // We don't put fetches in the constructor. Why? Ask Jordan :)
    fetch('/items', {
      method: 'GET' // GET is the default method, so this is optional
    })
      .then(response => response.text()) // get the HTTP response body
      .then(responseBody => {
        let parsedResponse = JSON.parse(responseBody);
        this.setState({ items: parsedResponse })
      })
  }
  handleInputChange = event => {
    let inputValue = event.target.value
    this.setState({itemInput: inputValue});
  }
  handleSubmit = event => {
    event.preventDefault();
    let bod = JSON.stringify(this.state.itemInput);
    fetch('/addItem', {
      method: 'POST', // GET is the default method, so this is optional
      body: bod
    })
      .then(response => response.text()) // get the HTTP response body
      .then(responseBody => {
        let parsedResponse = JSON.parse(responseBody);
        // The state only gets updated when the response is received
        this.setState({ items: parsedResponse })

      })
      //document.getElementById("inputText") = " ";
      
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input id = "inputText" type="text" value={this.state.itemInput} onChange={this.handleInputChange}></input>
          <input type="submit"></input>
        </form>
        <ul>
          {this.state.items.map(item => (<li> {item} </li>))}
        </ul>
      </div>
    );
  }
}

export default App;
