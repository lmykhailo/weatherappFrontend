import { useContext } from 'react'
import { Auth, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '../..'
import { NavLink } from 'react-router-dom'
import {
  HOMEPAGE_ROUTE,
  POSTSPAGE_ROUTE,
  PROFILE_ROUTE,
} from '../../routes/consts/consts'
import HomeIcon from '../../assets/Icons/NavbarIcons/HomeIcon'
import ProfileIcon from '../../assets/Icons/NavbarIcons/ProfileIcon'
import LogOutIcon from '../../assets/Icons/NavbarIcons/LogOutIcon'
import PostsPageIcon from '../../assets/Icons/NavbarIcons/PostsPageIcon'

const NavBar = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Context is not provided')
  }

  const { auth } = context as { auth: Auth }
  const [user] = useAuthState(auth)

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <>
      {user ? (
        <nav className="flex w-full items-stretch justify-between rounded bg-white bg-opacity-20 px-4 py-2 text-zinc-700 drop-shadow-lg backdrop-blur-lg">
          <NavLink to={HOMEPAGE_ROUTE} className="flex items-center">
            <button className="mx-2 flex h-full items-center rounded-md px-4 py-2 text-lg font-black text-white hover:bg-gray-200 hover:bg-opacity-30 hover:text-slate-700 ">
              <HomeIcon></HomeIcon>
              <p className="ml-2 hidden md:flex">Home</p>
            </button>
          </NavLink>
          <NavLink to={POSTSPAGE_ROUTE} className="flex items-center">
            <button className="mx-2 flex h-full items-center rounded-md px-4 py-2 text-lg font-black text-white hover:bg-gray-200 hover:bg-opacity-30 hover:text-slate-700 ">
              <PostsPageIcon></PostsPageIcon>
              <p className="ml-2 hidden md:flex">Blog posts</p>
            </button>
          </NavLink>
          <div className="flex-grow"></div>
          {user.isAnonymous ? (
            <></>
          ) : (
            <NavLink
              to={PROFILE_ROUTE}
              className="flex items-center rounded-md px-4 font-black text-white hover:bg-gray-200 hover:bg-opacity-30 hover:text-slate-700"
            >
              <ProfileIcon></ProfileIcon>
              <p className="hidden h-full rounded-md px-2 py-2 text-lg md:flex">
                Profile
              </p>
            </NavLink>
          )}
          <button
            onClick={handleLogout}
            className="mx-2 flex h-full items-center rounded-md px-4 py-2 text-lg font-black text-white hover:bg-gray-200 hover:bg-opacity-30 hover:text-slate-700"
          >
            <LogOutIcon></LogOutIcon>
            <p className="ml-2  hidden md:flex">Logout</p>
          </button>
        </nav>
      ) : (
        <></>
      )}
    </>
  )
}

export default NavBar
