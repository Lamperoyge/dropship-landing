import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import di from './services/DI';
class App extends Component {


  constructor() {
    super();
    this.state = {
        response: ''
    };
  }


  componentDidMount() {
    this.callApi()
    .then(res => this.setState({response: res}))
  }

  callApi = async () => {
    const response = await di().getHello;
    const body = await response.json()

    if (response.status !== 200) throw Error(body.message);
    return body;
  }


  render() {
    return (
      <div className="App">
      <span>{this.state.response.express}</span>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
