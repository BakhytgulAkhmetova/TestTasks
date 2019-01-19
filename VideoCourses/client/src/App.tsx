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

interface State {
  login: string | null,
  courseId: string
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { login: localStorage.getItem('login'), courseId: '' }
  }
  handleLogOff () {
    this.setState({ login: null} as State);
    localStorage.clear(); 
  }
  handleChangeLayoutLogin (login: string ) {
    localStorage.setItem('login', login);
    this.setState({...this.state, login: localStorage.getItem('login')} as State);
  }
  handleChangeLayoutCourseId (id: string ) {
    this.setState({ ...this.state, courseId: id } as State);
  }
  render() {
    const pathArray = window.location.pathname.split('/');
    return (
      <Provider store={store}>
        <div className="app">
          <Router>
              <Switch>
                <Layout 
                    contentStyle='layout__content-login' 
                    path='/login' 
                    propsContent={{ handleChangeLayoutLogin: this.handleChangeLayoutLogin.bind(this)}}
                    Content={ContentLogin}/>
                <Layout 
                    contentStyle='layout__content-course-form' 
                    path='/courses/new' 
                    Content={ContentCourseAdd}
                    propsHeader={{login: this.state.login,
                    handleLogOff: this.handleLogOff.bind(this),
                    pathList:['Курсы', 'Новый']}}
                    HeaderParticular={HeaderPrivate}/>
                <Layout 
                    contentStyle='layout__content-course-form' 
                    path='/courses/:id' 
                    Content={ContentCourseEdit}
                    propsContent={{handleChangeLayoutCourseId: this.handleChangeLayoutCourseId.bind(this)}}
                    propsHeader={{login: this.state.login,
                    handleLogOff: this.handleLogOff.bind(this),
                    pathList:['Курсы', 'Курс ' + this.state.courseId]}}
                    HeaderParticular={HeaderPrivate}/>
                <Layout 
                    contentStyle='layout__content-courses' 
                    path='/courses' 
                    Content={ContentCourse} 
                    propsHeader={{login: this.state.login,
                    handleLogOff: this.handleLogOff.bind(this),
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
