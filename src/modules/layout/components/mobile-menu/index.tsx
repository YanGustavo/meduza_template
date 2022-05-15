import { Dialog, Transition } from "@headlessui/react"
import { useAccount } from "@lib/context/account-context"
import X from "@modules/common/icons/x"
import Link from "next/link"
import React, { Fragment } from "react"
import { SiteProps } from "types/global"

type MobileMenuProps = {
  open: boolean
  onClose: () => void
} & SiteProps

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, site }) => {
  const { customer, retrievingCustomer } = useAccount()
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-50 lg:hidden"
        onClose={onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="pointer-events-none fixed inset-y-0 right-left flex max-w-full">
            <Transition.Child
              as={Fragment}
              enter="transition-all ease-in-out duration-500"
              enterFrom="-translate-x-full opacity-0"
              enterTo="translate-x-0 opacity-100"
              leave="transition ease-in-out duration-500 transform"
              leaveFrom="translate-x-0 opacity-100"
              leaveTo="-translate-x-full opacity-0"
            >
              <div className="relative w-screen max-w-md pointer-events-auto py-6 px-8 bg-white text-gray-900 flex flex-col overflow-y-auto">
                <div className="flex items-center justify-end mb-6">
                  <button onClick={onClose}>
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-y-1 text-large-semi text-gray-900 uppercase">
                      {site.navData.collections.map((collection) => {
                        return (
                          <Link
                            href={`/collections/${collection.id}`}
                            passHref
                            key={collection.id}
                          >
                            <a>{collection.title}</a>
                          </Link>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex flex-col gap-y-1 text-base-regular text-gray-700">
                      {!customer || retrievingCustomer ? (
                        <>
                          <Link href={`/account/login`} passHref>
                            <a>Login</a>
                          </Link>
                          <Link href={`/account/create`} passHref>
                            <a>Create account</a>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link href={`/account`} passHref>
                            <a>Account</a>
                          </Link>
                          <Link href={`/account/addresses`} passHref>
                            <a>Addresses</a>
                          </Link>
                          <Link href={`/account/orders`} passHref>
                            <a>Orders</a>
                          </Link>
                          {process.env.FEATURE_WISHLIST_ENABLED && (
                            <Link href={`/account/wishlist`} passHref>
                              <a>Wishlist</a>
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default MobileMenu
