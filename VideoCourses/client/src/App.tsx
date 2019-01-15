import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Layout } from './components/Layout';
import { ContentLogin } from './pages/Login/ContentLogin';
import { ContentCourse } from './pages/Course/ContentCourse';
import { store } from './store/store';

import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Router>
              <Switch>
                <Layout contentStyle='layout__content-login' path='/login' Component={ContentLogin}/>
                <Layout contentStyle='layout__content-courses' path='/courses' Component={ContentCourse} />
              </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
