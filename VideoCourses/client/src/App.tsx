import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Layout } from './components/Layout';
import { ContentLogin } from './pages/Login/ContentLogin';
import { ContentCourse } from './pages/Course/ContentCourse';
import { ContentCourseAdd } from './pages/CourseAdd/ContentCourseAdd';
import { ContentCourseEdit } from './pages/CourseEdit/ContentCourseEdit';
import { HeaderPrivate } from './components/HeaderPrivate';
import { store } from './store/store';
import { ModalProvider } from './components/ModalProvider'

import './App.scss';

class App extends React.Component<{}, {}> {
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
                    contentStyle='layout__content-course-form' 
                    path='/courses/new' 
                    Content={ContentCourseAdd}
                    propsHeader={{login: localStorage.getItem('login'),
                     handleLogOff: () =>{localStorage.clear(); console.log(localStorage)},
                      pathList:['Курсы', 'Новый']}}
                    HeaderParticular={HeaderPrivate}/>
                <Layout 
                    contentStyle='layout__content-course-form' 
                    path='/courses/:id' 
                    Content={ContentCourseEdit}
                    propsHeader={{login: localStorage.getItem('login'),
                    handleLogOff: () =>{localStorage.clear(); console.log(localStorage)},
                    pathList:['Курсы', 'id']}}
                    HeaderParticular={HeaderPrivate}/>
                <Layout 
                    contentStyle='layout__content-courses' 
                    path='/courses' 
                    Content={ContentCourse} 
                    propsHeader={{login: localStorage.getItem('login'),
                     handleLogOff: () =>{localStorage.clear(); console.log(localStorage)},
                     pathList:['Курсы']
                    }}
                    HeaderParticular={HeaderPrivate}/>
                <Route path='/' render={() => (<Redirect  from='/' to='/courses'/>)}/>
              </Switch>
          </Router>
          <ModalProvider/>
        </div>
      </Provider>
    );
  }
}

export default App;
