'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

import BiDish from '@/icons/BiDish'
import { classnames } from '@/utils'
import FiUsers from '@/icons/FiUsers'
// import VscGraph from '@/icons/VscGraph'
import BiBasket from '@/icons/BiBasket'
import Button from '@/components/common/Button'
import AiOutlineHome from '@/icons/AiOutlineHome'
import AiOutlineFile from '@/icons/AiOutlineFile'
import AiOutlineBell from '@/icons/AiOutlineBell'
import LinkButton from '@/components/common/LinkButton'

const links = [
  {
    link: '/admin/dashboard',
    label: 'Dashboard',
    Icon: AiOutlineHome,
  },
  {
    link: '/admin/orders',
    label: 'Orders',
    Icon: AiOutlineFile,
  },
  { link: '/admin/students', label: 'Students', Icon: FiUsers },
  // {
  //   link: '/admin/analytics',
  //   label: 'Analytics',
  //   isActive: false,
  //   Icon: VscGraph,
  // },
  { link: '/admin/products', label: 'Products', Icon: BiDish },
  {
    link: '/admin/notifications',
    label: 'Notifications',
    isActive: false,
    Icon: AiOutlineBell,
  },
  {
    link: '/admin/categories',
    label: 'Categories',
    isActive: false,
    Icon: BiBasket,
  },
]
const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="flex min-h-screen max-w-80 flex-col gap-4 p-4">
      <Image
        height={100}
        width={80}
        alt="Poolaster"
        src="/images/logo.svg"
        className="mx-5 mb-4 w-14 duration-300 md:w-20"
      />

      <div className="grid">
        {links.map(({ link, label, Icon }) => (
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
            <span className="text-xl">
              <Icon />
            </span>
            {label}
          </LinkButton>
        ))}
      </div>

      <div className="mt-auto flex gap-4 rounded-lg bg-primary p-4">
        <div className="flex-2 grid gap-3">
          <p className="text-sm font-light text-white">
            Please, organize your menus through button bellow! +Add Menus
          </p>
          <Button className="rounded-lg bg-white text-sm !text-black">
            Add Meny
          </Button>
        </div>
        <Image
          width={76}
          height={90}
          alt='"Cheff'
          className="flex-1"
          src="/images/extras/chef.svg"
        />
      </div>
    </aside>
  )
}

export default Sidebar
