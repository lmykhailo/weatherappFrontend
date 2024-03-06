import ForgetPasswordPage from '../pages/ForgetPasswordPage/ForgetPasswordPage'
import HomeMainPage from '../pages/HomeMainPage/HomeMainPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import PostsPage from '../pages/PostsPage/PostsPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage'
import SinglePostPage from '../pages/SinglePostPage/SinglePostPage'
import {
  POSTSPAGE_ROUTE,
  FORGETPASSWORD_ROUTE,
  HOMEPAGE_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  ONEPOSTPAGE_ROUTE,
} from './consts/consts'

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: LoginPage,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: RegistrationPage,
  },
  {
    path: FORGETPASSWORD_ROUTE,
    Component: ForgetPasswordPage,
  },
]

export const privateRoutes = [
  {
    path: HOMEPAGE_ROUTE,
    Component: HomeMainPage,
  },
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage,
  },
  {
    path: ONEPOSTPAGE_ROUTE,
    Component: SinglePostPage,
  },
  {
    path: POSTSPAGE_ROUTE,
    Component: PostsPage,
  },
]
