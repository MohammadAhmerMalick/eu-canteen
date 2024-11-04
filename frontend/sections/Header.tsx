import Link from 'next/link'
import Image from 'next/image'

import { classnames } from '@/utils'

const Header = () => {
  const isLoggedIn = false

  return (
    <header className="mx-auto max-w-7xl px-4 py-2">
      <div className="flex items-center justify-between gap-4">
        <Link href="/">
          <Image
            height={120}
            width={80}
            src="/images/logo.svg"
            alt="Poolaster"
            className={classnames(
              'duration-300 md:w-24',
              isLoggedIn ? 'w-10' : 'w-14'
            )}
          />
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <p className="rounded-3xl bg-white px-4 py-2 text-sm shadow-lg">
              €5.08
            </p>
            <div className={classnames('rounded-full bg-white p-1 shadow')}>
              <Image
                width={56}
                height={56}
                alt="Agent"
                src="/images/agents/agent-1.png"
                className="w-10 rounded-full border border-primary bg-primary"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p className="rounded-3xl bg-white px-4 py-2 text-sm shadow-lg">
              ENG
            </p>
            <div className="flex items-center gap-1 rounded-full bg-black p-1 text-sm md:text-base">
              <Link href="/register" className="db pr-2 ps-3 text-white">
                Register Here
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-primary px-4 py-1 text-white"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
