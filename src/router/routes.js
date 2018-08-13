import Home from '../views/index/index'
import Login from '../views/passport/login'
import Register from '../views/passport/register'
import Error from '../views/error'

export default {
  menu: [
    {
      key:'/',
      path: '/',
      title: '首页',
      icon: 'index',
      component: Home,
      pathName: 'Index'
    },
    {
      key:'/login',
      path: '/login',
      title: '登录',
      icon: 'login',
      component: Login,
      pathName: 'Login'
    },
    {
      key:'/register',
      path: '/register',
      title: '注册',
      icon: 'register',
      component: Register,
      pathName: 'Register'
    }
  ],
  errorPage: {
    key:'*',
    path: '*',
    title: '404',
    icon: 'error',
    component: Error,
    pathName: 'Error'
  }
}