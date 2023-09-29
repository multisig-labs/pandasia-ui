import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

export function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div className="flex cursor-pointer justify-around" onClick={openConnectModal}>
                    <div className="hover-glow border border-primary-600 p-2 font-bold">
                      CONNECT WALLET
                    </div>
                  </div>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex cursor-pointer justify-between gap-2">
                  <div className="hover-glow border border-primary-600 p-2 font-bold">
                    <button
                      onClick={openChainModal}
                      className="flex items-center gap-2"
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div>
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              width={24}
                              height={24}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>
                  </div>
                  <div className="hover-glow border border-primary-600 p-2 font-bold">
                    <button onClick={openAccountModal} type="button">
                      {account.displayName}
                      {account.displayBalance ? ` (${account.displayBalance})` : ''}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
