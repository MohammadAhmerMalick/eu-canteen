'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { classnames } from '@/utils'
import LinkButton from '@/components/common/LinkButton'
import AddProductWidget from '@/widgets/AddProductWidget'

export interface SidebarLink {
  link: string
  label: string
  icon: ReactNode
}
interface SidebarProps {
  links: SidebarLink[]
  isAdmin?: boolean
}

const Sidebar = ({ links, isAdmin }: SidebarProps) => {
  const pathname = usePathname()

  return (
    <aside className="flex min-h-screen max-w-80 flex-col gap-4 p-4">
      <Link href="/">
        <Image
          height={100}
          width={80}
          alt="Poolaster"
          src="/images/logo.svg"
          className="mx-5 mb-4 w-14 duration-300 md:w-20"
        />
      </Link>

      <div className="grid">
        {links.map(({ link, label, icon }) => (
          <LinkButton
            key={label}
            href={link}
            className={classnames(
              'group relative flex items-center gap-3 rounded-lg px-6 py-3 text-sm duration-300',
              pathname === link
                ? 'bg-primary-light !text-primary'
                : 'bg-white !text-black'
            )}
          >
            <span
              className={classnames(
                'alt absolute -left-4 bottom-0 top-0 my-auto w-1 rounded-xl bg-primary duration-300 group-hover:h-11',
                pathname === link ? 'h-11' : 'h-0'
              )}
            />
            <span className="text-xl">{icon}</span>
            {label}
          </LinkButton>
        ))}
      </div>

      {isAdmin && <AddProductWidget />}
    </aside>
  )
}

export default Sidebar
