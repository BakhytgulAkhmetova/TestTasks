import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Layout } from './components/Layout';
import { ContentLogin } from './pages/Login/ContentLogin';
import { ContentCourse } from './pages/Course/ContentCourse';
import { HeaderCourse } from './pages/Course/HeaderCourse';
import { store } from './store/store';

import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Router>
              <Switch>
                <Layout 
                    contentStyle='layout__content-login' 
                    path='/login' 
                    Content={ContentLogin}/>
                <Layout 
                    contentStyle='layout__content-courses' 
                    path='/courses' 
                    Content={ContentCourse} 
                    propsHeader={{login: 'userlogin'}}
                    HeaderParticular={HeaderCourse}/>
                <Layout 
                    contentStyle='layout__content-login' 
                    path='/' 
                    Content={ContentLogin}/>
              </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
