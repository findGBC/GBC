import { ConnectKitButton } from 'connectkit'

import { ButtonType } from '../../../global/enum'
import { Button } from '../../atoms'

import WalletButton from './WalletButton'

export const WalletConnect = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, ensName }) => {
        return isConnected && address ? (
          <WalletButton address={address} ensName={ensName} />
        ) : (
          <Button btnType={ButtonType.Ghost} onClick={show}>
            Connect
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

export default WalletConnect
