import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import Login from './Login'
import Logout from './Logout'
import favicon from '../app/favicon.ico'

const Nav = () => {
  const { user, error, isLoading } = useUser()
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <nav className="top-0 shadow-md p-4 flex justify-between items-center">
      {user ? (
        <>
          <div className="flex items-center">
            <Image
              src={user.picture || 'https://via.placeholder.com/50'}
              alt={user.name || 'User Picture'}
              width={50}
              height={50}
              className="rounded-full"
              unoptimized
            />
            <p className="ml-4">Welcome, {user.name}!</p>
          </div>
          <Logout />
        </>
      ) : (
        <>
          <div className="flex items-center">
            <Image
              src={favicon}
              alt="Next.js Logo"
              width={50}
              height={50}
              className="rounded-full"
              unoptimized
            />
          </div>
          <Login />
        </>
      )}
    </nav>
  )
}

export default Nav
