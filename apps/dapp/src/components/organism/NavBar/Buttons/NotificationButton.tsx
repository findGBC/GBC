import { BellIcon } from '@heroicons/react/outline'
import {
  initWeb3InboxClient,
  useNotifications,
  usePrepareRegistration,
  useRegister,
  useSubscribe,
  useSubscription,
  useUnsubscribe,
  useWeb3InboxAccount,
  useWeb3InboxClient,
} from '@web3inbox/react'
import { useState, useRef, useEffect } from 'react'
import { useSignMessage, useAccount } from 'wagmi'

import NotificationsIcon from '../../../../assets/img/icon-image.jpg'
import { ButtonType } from '../../../../global/enum'
import { Button } from '../../../atoms'

type NotificationPopUpProps = {
  isOpen: boolean
  onClose: () => void
}

const NotificationPopUp = ({ isOpen, onClose }: NotificationPopUpProps) => {
  const modalRef = useRef()
  const { data: w3iClient, isLoading: w3iClientIsLoading } = useWeb3InboxClient()

  const { data: subscription } = useSubscription()
  const isSubscribed = Boolean(subscription)

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return isOpen ? (
    <div
      ref={modalRef}
      className="bg-opacity-10 bg-base-100 mt-[10px] lg:right-0 right-[-120px] w-[300px] absolute top-[100%]"
    >
      <div className="bg-base-200 rounded-[1rem] p-5 flex flex-col items-center">
        <main>
          {w3iClientIsLoading ? (
            <div>Loading W3I Client</div>
          ) : (
            <div>
              <div>{isSubscribed ? <Messages /> : null}</div>
            </div>
          )}
        </main>
      </div>
    </div>
  ) : null
}

type NotificationRegisterModalProps = {
  showModal: boolean
  address: `0x${string}`
}

const NotificationRegisterModal = ({ showModal, address }: NotificationRegisterModalProps) => {
  const { signMessageAsync } = useSignMessage()
  const { prepareRegistration } = usePrepareRegistration()
  const { register, isLoading: isRegistering } = useRegister()
  // const { data: w3iClient, isLoading: w3iClientIsLoading } = useWeb3InboxClient()
  const { isRegistered } = useWeb3InboxAccount(`eip155:1:${address}`)

  const { subscribe, isLoading: isSubscribing } = useSubscribe()
  const { unsubscribe, isLoading: isUnsubscribing } = useUnsubscribe()
  const { data: subscription } = useSubscription()
  const isSubscribed = Boolean(subscription)
  const handleRegistration = async () => {
    try {
      const { message, registerParams } = await prepareRegistration()
      const signature = await signMessageAsync({ message: message })
      await register({ registerParams, signature })
    } catch (registerIdentityError: any) {
      // eslint-disable-next-line no-console
      console.error(registerIdentityError)
    }
  }

  return (
    <>
      {showModal && !isSubscribed && (
        <dialog id="notificationModal" className="modal">
          <div className="modal-box w-[350px]">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                const dialog = document.getElementById('notificationModal') as HTMLDialogElement
                dialog.close()
              }}
            >
              ✕
            </button>
            <div className="p-5 flex flex-col items-center">
              <img src={NotificationsIcon} alt="notif" className="w-28 h-28 rounded-full my-4 " />
              <h2 className="text-xl text-base-content">On-Chain Notifications</h2>
              <p className="text-center text-[14px] py-2">
                To stay updated on upcoming <br />
                updates and new features!
              </p>
            </div>
            {isRegistered ? null : (
              <button
                onClick={handleRegistration}
                disabled={isRegistered}
                className="bg-primary rounded-[0.5rem] px-24 py-2 mt-2 w-full text-center"
              >
                <h2 className="text-base-content">Register</h2>
              </button>
            )}
            {isSubscribed && isRegistered ? null : (
              <button
                onClick={isSubscribed ? unsubscribe : subscribe}
                disabled={isSubscribing || isUnsubscribing}
                className="bg-primary rounded-[0.5rem] px-24 py-2 mt-2 w-full text-center"
              >
                {isSubscribed ? null : <h2 className="">Activate</h2>}
              </button>
            )}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      )}
    </>
  )
}

const NotificationButton = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const projectId = 'ee05477a503741ca2cea692cbd359514'
  const appDomain = process.env.PUBLIC_APP_DOMAIN as string
  const { isConnected, address } = useAccount()
  const { data: subscription } = useSubscription()
  const isSubscribed = Boolean(subscription)

  initWeb3InboxClient({
    allApps: process.env.NODE_ENV !== 'production',
    domain: appDomain,
    projectId,
  })

  const handleOpenNotification = () => {
    console.log(isSubscribed)
    if (isSubscribed) {
      setShowPopup(true)
      setShowRegisterModal(false)
    } else {
      setShowPopup(false)
      setShowRegisterModal(true)
      const dialog = document.getElementById('notificationModal') as HTMLDialogElement
      if (dialog) {
        dialog.showModal()
      }
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  return (
    <>
      {isConnected && (
        <div className="indicator" style={{ position: 'relative' }}>
          <Button
            btnType={ButtonType.Ghost}
            className="px-3 md:px-4"
            onClick={handleOpenNotification}
          >
            <div className="flex items-center">
              <div className="w-6 h-6">
                <BellIcon></BellIcon>
              </div>
            </div>
            {!showRegisterModal ? null : (
              <div className="indicator-item indicator-bottom badge badge-primary badge-xs"></div>
            )}
          </Button>
          <NotificationPopUp isOpen={showPopup} onClose={handleClosePopup} />
          <NotificationRegisterModal showModal={showRegisterModal} address={address!} />
        </div>
      )}
    </>
  )
}

export default NotificationButton

function Messages() {
  const { data: notifications } = useNotifications(3, false)

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(notifications);
    }, 10000);
    return () => clearInterval(interval);
  }, [notifications]);

  return (
    <div className='w-full'>
        <h2 className="text-base-content text-lg">Notifications</h2>
        {!notifications?.length ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : (
          notifications.map(({ id, ...message }) => (
            <div key={id} className="bg-base-300 rounded-xl mb-2 px-8 py-4">
              <h3 className="">{message.title}</h3>
              <p className="opacity-60 text-[12px]">{message.body}</p>
            </div>
          ))
        )}
      
    </div>
  )
}
