/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import {Switch, Route} from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';
import NotificationSystem from 'react-notification-system';
import {style} from "../../variables/Variables";
import appRoutes from './routes/app.js';
import {
  Redirect
} from 'react-router-dom';
const AppWrapper = styled.div `
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this
      .componentDidMount
      .bind(this);
    this.handleNotificationClick = this
      .handleNotificationClick
      .bind(this);
    this.state = {
      _notificationSystem: null
    };
  }
  handleNotificationClick(position) {
    var color = Math.floor((Math.random() * 4) + 1);
    var level;
    switch (color) {
      case 1:
        level = 'success';
        break;
      case 2:
        level = 'warning';
        break;
      case 3:
        level = 'error';
        break;
      case 4:
        level = 'info';
        break;
      default:
        break;
    }
    this
      .state
      ._notificationSystem
      .addNotification({title: (
          <span data-notify="icon" className="pe-7s-gift"></span>
        ), message: (
          <div>
            Welcome to
            <b>Light Bootstrap Dashboard</b>
            - a beautiful freebie for every web developer.
          </div>
        ), level: level, position: position, autoDismiss: 15});
  }
  componentDidMount() {
    console.log('start to set notifaction')
    this.setState({_notificationSystem: this.refs.notificationSystem});
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor((Math.random() * 4) + 1);
    var level;
    switch (color) {
      case 1:
        level = 'success';
        break;
      case 2:
        level = 'warning';
        break;
      case 3:
        level = 'error';
        break;
      case 4:
        level = 'info';
        break;
      default:
        break;
    }
    _notificationSystem.addNotification({title: (
        <span data-notify="icon" className="pe-7s-gift"></span>
      ), message: (
        <div>
          Welcome to
          <b>Light Bootstrap Dashboard</b>
          - a beautiful freebie for every web developer.
        </div>
      ), level: level, position: "tr", autoDismiss: 15});
  }
  componentDidUpdate(e) {
    console.log('componentDidUpdate')
    if (window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1) {
      document
        .documentElement
        .classList
        .toggle('nav-open');
    }
  }
  render() {
    console.log('start to render')
    return (

      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style}/>
        <Sidebar {...this.props}/>
        <div id="main-panel" className="main-panel">
          <Header {...this.props}/>
          <Switch>
            {appRoutes.map((prop, key) => {
              if (prop.name === "Notifications")
                return (
                  <Route
                    path={prop.path}
                    key={key}
                    render={routeProps => <prop.component {...routeProps} handleClick={this.handleNotificationClick}/>}/>
                );
              if (prop.redirect)
                return (<Redirect from={prop.path} to={prop.to} key={key}/>);
              return (<Route path={prop.path} component={prop.component} key={key}/>);
            })
}
          </Switch>
          <Footer/>
        </div>
      </div>
    );
  }
}
