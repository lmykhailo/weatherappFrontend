import { useContext } from 'react'
import { Context } from '../../index'
import { Route, Routes, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes'
import { HOMEPAGE_ROUTE, LOGIN_ROUTE } from '../consts/consts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Auth } from 'firebase/auth'

const AppRouter = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Context is not provided')
  }

  const { auth } = context as { auth: Auth }
  const [user] = useAuthState(auth)

  return (
    <Routes>
      {user ? (
        <>
          {privateRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to={HOMEPAGE_ROUTE} />} />
        </>
      ) : (
        <>
          {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </>
      )}
    </Routes>
  )
}

export default AppRouter
