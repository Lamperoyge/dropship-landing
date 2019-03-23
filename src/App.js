import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import di from './services/DI';
import Layout from './components/Layout'
class App extends Component {


  constructor() {
    super();
    this.state = {
        response: ''
    };
  }


  componentDidMount() {
    this.callApi().then((res) => console.log(res));
  }

  callApi = async () => {
    const response = await di().getHello;
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }


  render() {
    return (
      <div>
        <Layout />
      </div>
    );
  }
}

export default App;
