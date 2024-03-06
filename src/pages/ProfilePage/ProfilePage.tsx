import { Auth } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import EditProfileIcon from '../../assets/Icons/ProfilePageIcons/EditProfileIcon'
import ProfileUserInformation from '../../components/ProfileUserInformation/ProfileUserInformation'
import EditUserInformation from '../../components/EditUserInformation/EditUserInformation'
import useUserBackend from '../../hooks/useUserBackend'
import AdminPanel from '../../components/AdminPanel/AdminPanel'

const ProfilePage = () => {
  const [showEdit, setShowEdit] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const context = useContext(Context)
  if (!context) {
    throw new Error('Context is not provided')
  }
  const { getAdminRightsOfUser } = useUserBackend()

  const { auth } = context as { auth: Auth }
  const onShowEdit = () => {
    setShowEdit((prevState) => !prevState)
  }

  useEffect(() => {
    const fetchAdminRights = async () => {
      const adminStatus = await getAdminRightsOfUser()
      console.log(adminStatus + '1')
      if (adminStatus !== null) {
        setIsAdmin(adminStatus)
      }
    }

    fetchAdminRights()
  }, [])
  return (
    <div className="mt-5 flex h-full flex-col items-center justify-center">
      <section
        className="flex h-auto w-full flex-col items-center justify-center rounded bg-white
       bg-opacity-20 p-4 text-center text-zinc-700 drop-shadow-lg
        backdrop-blur-lg md:max-w-[500px] md:px-8"
      >
        <div className="mb-5 flex w-full items-center justify-between">
          <h1 className="text-2xl font-black text-white">Profile</h1>
          <button onClick={onShowEdit} className="flex justify-end text-white">
            <EditProfileIcon />
          </button>
        </div>
        {showEdit ? (
          <EditUserInformation showEdit={showEdit} onShowEdit={onShowEdit} />
        ) : (
          <ProfileUserInformation />
        )}
      </section>
      {isAdmin ? <AdminPanel></AdminPanel> : <></>}
    </div>
  )
}

export default ProfilePage
