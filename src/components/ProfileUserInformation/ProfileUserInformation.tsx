import { Auth } from 'firebase/auth'
import { useContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '../..'
const ProfileUserInformation = () => {
  const [showEdit, setShowEdit] = useState(false)
  const context = useContext(Context)
  if (!context) {
    throw new Error('Context is not provided')
  }

  const { auth } = context as { auth: Auth }
  const [user] = useAuthState(auth)
  const onShowEdit = () => {
    setShowEdit((prevState) => !prevState)
  }
  console.log(user?.photoURL)
  return (
    <div>
      <img
        src={
          user?.photoURL ||
          'https://firebasestorage.googleapis.com/v0/b/weatherappproject-bc43d.appspot.com/o/profilePictures%2Fanonymoususer.jpg?alt=media&token=32635f96-9783-4211-999a-b559e3b13974'
        }
        className="mx-auto mb-5 h-32 w-32 rounded-full object-cover"
      />

      <h2 className="mb-3 text-lg font-black text-white">
        Your email is {user?.emailVerified ? 'verified' : 'is not verified'}
      </h2>
      <p className=" mb-5 w-full rounded-lg bg-blue-600 py-2 text-center text-white">
        Personal details
      </p>
      <h2 className="mb-5 text-xl text-white">
        Profile name : {user?.displayName}
      </h2>
      <h2 className="mb-5 text-xl text-white">User Email : {user?.email}</h2>
      <h2 className="mb-5 text-xl text-white">
        Phone number :{' '}
        {user?.phoneNumber == null ? 'not attached' : user?.phoneNumber}
      </h2>
    </div>
  )
}

export default ProfileUserInformation
