import Image from 'next/image'

import BiDish from '@/icons/BiDish'
import { classnames } from '@/utils'
import FiUsers from '@/icons/FiUsers'
import VscGraph from '@/icons/VscGraph'
import Button from '@/components/common/Button'
import AiOutlineHome from '@/icons/AiOutlineHome'
import AiOutlineFile from '@/icons/AiOutlineFile'
import LinkButton from '@/components/common/LinkButton'

const links = [
  { link: '/', label: 'Dashboard', isActive: false, Icon: AiOutlineHome },
  { link: '/', label: 'Order Detail', isActive: false, Icon: AiOutlineFile },
  { link: '/', label: 'Students', isActive: true, Icon: FiUsers },
  { link: '/', label: 'Analytics', isActive: false, Icon: VscGraph },
  { link: '/', label: 'Products', isActive: false, Icon: BiDish },
]
const Sidebar = () => {
  return (
    <aside className="flex h-screen max-w-80 flex-col gap-4 p-4 shadow-md">
      <Image
        height={100}
        width={80}
        alt="Poolaster"
        src="/images/logo.svg"
        className={'mx-5 mb-4 w-14 duration-300 md:w-20'}
      />

      <div className="grid">
        {links.map(({ link, label, isActive, Icon }) => (
          <LinkButton
            key={label}
            href={link}
            className={classnames(
              'flex items-center gap-3 rounded-lg bg-white px-6 py-4 !text-black',
              isActive && 'bg-primary-light !text-primary'
            )}
          >
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
