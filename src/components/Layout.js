import React, { Component } from 'react'
import bart from '../tonyboss.png'
import foreverLogo from '../foreverlitlogo.png'
import validator from 'validator';
import di from '../services/DI';
import Loader from './Loader';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import '../loader.css'
import * as emailjs from 'emailjs-com';

export default class Layout extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      checkbox: false,
      status: false,
      loaded: false
    }
  }


  destroyLoader = () => {
    setTimeout(() => {
      this.setState({
        loaded: true
      })
    }, 1200)
  }

  componentDidMount() {
    this.destroyLoader();
  };

  handleCheckbox = (event) => {
    this.setState({
      checkbox: event.target.checked
    })
  }

  validation = () => {
    if(validator.isEmail(this.state.email) && this.state.checkbox) {
      return true
    } 
    else return false;
  }


  sendEmail = () => {
    emailjs.send('user_wqoXA2gsZpuxZv9oKy7Eo','foreverlit', {text: this.state.email})
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(err) {
       console.log('FAILED...', err);
    });

    const email = this.state.email;
    const body = JSON.stringify({email: email})
    di(body).sendEmail.then(() => {
      this.setState({
        email: '',
        checkbox: false,
        status: true
      })
    })
  };

  handleEmail = (event) => {
    this.setState({
        email: event.target.value
    })
  };

  render() {
      const ConditionalRendering = () => {
        if(this.state.loaded) {
          return(
            <ReactCSSTransitionGroup transitionName="example"
            transitionAppear={true} transitionAppearTimeout={500}
            transitionEnter={false} transitionLeave={true}
            transitionLeaveTimeout={500}>
            <div className="sticky-container">
            <div id="amazingUnnecessaryContainer">
              <div className="slideContainer">
                <div className="slideTextSection">
                  <div className="slideHeader"><img className="slideHeadLogo" src={foreverLogo}/>
                  </div>
                  <div id="textsContainer">
                    <p className="slideTextTitle">Apparel that's cool, hot and unique, just like Terry Crews</p>
                    <p className="slideTextDescription">Our store developer is quite lazy, meh, it happens. <br></br>(Sucks for us too) We'll be ready on first of april 2019 though. <br></br>But don't be upset, we've got you covered with a <b>10% discount on first order + free shipping</b>.
                    </p>
                  </div>
                  <div className="absolutePositionContent">
                    <p className="slideEmailInputFooter"> Get started to find out more.(hit or miss, we won't spam you, promise)</p>
                    <div className="emailInputContainer"><input className="awesomeEmailInput" type="email" name="awesome-email" onBlur={this.handleEmail} placeholder="Your email goes here" /><button onClick={this.sendEmail} className={`awesomeButton ${!this.validation()? 'awesomeButtonDisabled' : ''}`} disabled={!this.validation()} style={{backgroundColor: '#FB7566'}}><i className="fas fa-angle-right" /></button></div>
                    <span className="emailValidation">Got it! Expect the unexpected. The good unexpected.</span><label className="checkboxContainer"><input className="slideCheckbox" defaultChecked={this.state.checkbox} onChangeCapture={this.handleCheckbox} type="checkbox" autoComplete="off" /><span className="checkmark" />I agree to receive emails from ForeverLit with news, deals and friendly messages. </label>
                    <div className="notAnotherContainer">
                    </div>
                    <div id="scrollContainer" />
                  </div>
                </div>
                <div className="slideImageSection">
                <img className="mockup images" style={{backgroundImage: `url(${bart})`, backgroundPosition: 'center', backgroundSize: 'cover'}} value={this.state.email} onLoad={this.destroyLoader}/>
                  <div className="socialToolbar">
                    <li className="shareFB"><a className="social-icon" href="#"><i className="fab fa-facebook-f" /></a></li>
                    <li className="shareTW"><a className="social-icon" href="#"><i className="fab fa-twitter" /></a></li>
                    <li className="shareLI"><a className="social-icon" href="#"><i className="fab fa-linkedin-in" /></a></li>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </ReactCSSTransitionGroup>
          )
        }
        else {
          return (
              <Loader key={1}/>
          )
        }
      }
      return(
          <ConditionalRendering /> 
    )
  }
}
