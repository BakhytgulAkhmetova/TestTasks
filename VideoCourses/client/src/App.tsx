import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Layout } from './components/Layout';
import { ContentLogin } from './pages/Login/ContentLogin';
import { ContentCourse } from './pages/Course/ContentCourse';
import { ContentCourseAdd } from './pages/CourseAdd/ContentCourseAdd';
import { HeaderPrivate } from './components/HeaderPrivate';
import { store } from './store/store';

import './App.scss';

class App extends React.Component<{}, {}> {
  render() {
    console.log(localStorage);
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
                    contentStyle='layout__content-course-form' 
                    path='/courses/new' 
                    Content={ContentCourseAdd}
                    propsHeader={{login: localStorage.getItem('login'),
                     handleLogOff: () =>{localStorage.clear()},
                      pathList:['Курсы', 'Новый']}}
                    HeaderParticular={HeaderPrivate}/>
                <Layout 
                    contentStyle='layout__content-courses' 
                    path='/courses' 
                    Content={ContentCourse} 
                    propsHeader={{login: localStorage.getItem('login'),
                     handleLogOff: () =>{localStorage.clear()},
                     pathList:['Курсы']
                    }}
                    HeaderParticular={HeaderPrivate}/>
                <Route path='/' render={() => (<Redirect  from='/' to='/courses'/>)}/>
              </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
