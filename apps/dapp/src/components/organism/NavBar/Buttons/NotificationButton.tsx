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
} from '@web3inbox/react'
import { useState, useRef } from 'react'
import { useSignMessage, useAccount } from 'wagmi'

import NotificationsIcon from '../../../../assets/img/icon-image.jpg'
import { ButtonType } from '../../../../global/enum'
import useOutsideClick from '../../../../hooks/useOutsideClick'
import { Button, Toast } from '../../../atoms'

type NotificationPopUpProps = {
  isOpen: boolean
  onClose: () => void
}

const NotificationPopUp = ({ isOpen, onClose }: NotificationPopUpProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { data: notifications } = useNotifications(3, false)
  useOutsideClick(modalRef, onClose)

  return isOpen ? (
    <div
      ref={modalRef}
      className="mt-[10px] bg-base-200 rounded-[1rem] p-5 lg:right-0 right-[-120px] w-[300px] absolute top-[100%]"
    >
      <h2 className="text-base-content text-lg">Notifications</h2>
      <div className=" flex flex-col items-center pt-4">
        {!notifications?.length ? (
          notifications === undefined ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            <p className="opacity-60 text-[12px]">No notifications yet.</p>
          )
        ) : (
          notifications.map(({ id, ...message }) => (
            <div key={id} className="bg-base-300 mb-2 rounded-xl w-full p-5">
              <h3 className="">{message.title}</h3>
              <p className="opacity-60 text-xs">{message.body}</p>
            </div>
          ))
        )}
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
  const { register } = useRegister()
  const { isRegistered } = useWeb3InboxAccount(`eip155:1:${address}`)

  const { subscribe, isLoading: isSubscribing } = useSubscribe()
  const { unsubscribe, isLoading: isUnsubscribing } = useUnsubscribe()
  const { data: subscription } = useSubscription()
  const isSubscribed = Boolean(subscription)
  const handleRegistration = async () => {
    const t = new Toast('Registering...', 'info')
    try {
      const { message, registerParams } = await prepareRegistration()
      const signature = await signMessageAsync({ message: message })
      await register({ registerParams, signature }).then(() => {
        t.update('success', 'Registered')
      })
    } catch (registerIdentityError: any) {
      t.update('error', 'Failed to register')
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
            {!isRegistered && (
              <button
                onClick={handleRegistration}
                disabled={isRegistered}
                className="bg-primary rounded-[0.5rem] px-24 py-2 mt-2 w-full text-center"
              >
                <h2 className="text-primary-content">Register</h2>
              </button>
            )}
            {isRegistered && (
              <button
                onClick={isSubscribed ? unsubscribe : subscribe}
                disabled={isSubscribing || isUnsubscribing}
                className="bg-primary rounded-[0.5rem] px-24 py-2 mt-2 w-full text-center"
              >
                {isSubscribed ? null : (
                  <h2
                    className="text-primary-content
"
                  >
                    Activate
                  </h2>
                )}
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
  const { data: notifications } = useNotifications(3, false)

  initWeb3InboxClient({
    allApps: process.env.NODE_ENV !== 'production',
    domain: appDomain,
    projectId,
  })

  const handleOpenNotification = () => {
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
            {notifications && notifications?.length > 0 ? (
              <div className="indicator-item indicator-bottom badge badge-primary badge-xs"></div>
            ) : null}
          </Button>
          <NotificationPopUp isOpen={showPopup} onClose={handleClosePopup} />
          <NotificationRegisterModal showModal={showRegisterModal} address={address!} />
        </div>
      )}
    </>
  )
}

export default NotificationButton
