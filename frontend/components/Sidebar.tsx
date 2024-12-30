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
    <aside className="flex h-dscreen min-h-screen flex-col gap-4 overflow-hidden p-2 md:p-4">
      <Link href="/">
        <Image
          height={100}
          width={80}
          alt="Poolaster"
          src="/images/logo.svg"
          className="mx-auto mb-4 w-14 max-w-full duration-300 md:mx-5 md:w-20"
        />
      </Link>

      <div className="grid">
        {links.map(({ link, label, icon }) => (
          <LinkButton
            key={label}
            href={link}
            className={classnames(
              'group relative flex w-full items-center gap-3 rounded-lg px-2 py-3 text-sm duration-300 md:px-6',
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
            <span className="hidden md:block">{label}</span>
          </LinkButton>
        ))}
      </div>

      {isAdmin && (
        <div className="hidden md:block">
          <AddProductWidget />
        </div>
      )}
    </aside>
  )
}

export default Sidebar
