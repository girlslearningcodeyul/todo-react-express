import React, { Component } from 'react';

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        }
    }
    componentDidMount() {
        // This is called after the first render
        // We don't put fetches in the constructor. Why? Ask Jordan :)

        fetch('/items?which=' + this.props.which, { //this endpoint will determine which list to display
            method: 'GET', // GET is the default method, so this is optional
        })
            .then(response => response.text()) // get the HTTP response body
            .then(responseBody => {
                let parsedResponse = JSON.parse(responseBody);
                //console.log("parsed response ", parsedResponse);
                this.setState({ items: parsedResponse })
            })
    }
    handleInputChange = event => {
        let inputValue = event.target.value
        this.setState({ itemInput: inputValue });
    }

    handleSubmit = event => {
        event.preventDefault();
        let bod = JSON.stringify({ item: this.state.itemInput, which: this.props.which }); //specify which body of which list to return
        this.setState({ itemInput: "" }) //sets the state of the input to empty, clearing the input box

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
    }

    handleReverse = event => {
        let bod = JSON.stringify({ which: this.props.which });
        event.preventDefault();

        fetch('/reverse', {
            method: "POST",
            body: bod
        })
            .then(response => response.text()) // get the HTTP response body
            .then(responseBody => {
                let parsedResponse = JSON.parse(responseBody);
                // The state only gets updated when the response is received
                this.setState({ items: parsedResponse })
            })
    }
    clearAll = event => {
        let bod = JSON.stringify({ which: this.props.which });
        event.preventDefault();
        fetch('/clearAll', {
            method: "POST",
            body: bod
        })
            .then(response => response.text()) // get the HTTP response body
            .then(res => {
                // The state only gets updated when the response is received
                this.setState({ items: JSON.parse(res) })
            })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.itemInput} onChange={this.handleInputChange}></input>
                    <input type="submit"></input>
                </form>
                <button onClick={this.handleReverse}>Reverse</button>
                <button onClick={this.clearAll}>Clear All</button>

                <ul>
                    {this.state.items.map(item => (<li> {item} </li>))}
                </ul>
            </div>
        );
    }
}

export default TodoList;