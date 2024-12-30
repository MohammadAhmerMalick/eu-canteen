import Image from 'next/image'

import FaPlus from '@/icons/FaPlus'
import LinkButton from '@/components/common/LinkButton'

const AddProductWidget = () => {
  return (
    <div className="mt-auto flex items-center gap-4 rounded-lg bg-primary p-4">
      <div className="flex-2 grid gap-2">
        <p className="font text-lg text-white">
          Organize <br /> Your Menu
        </p>
        <LinkButton
          href="/admin/products"
          className="flex items-center gap-1 rounded-lg bg-white text-sm !text-black"
        >
          <FaPlus /> Add Product
        </LinkButton>
      </div>
      <Image
        width={200}
        height={200}
        alt='"Cheff'
        className="size-20 flex-1 rounded-lg bg-primary-light/30 p-1"
        src="/images/extras/plate.png"
      />
    </div>
  )
}

export default AddProductWidget
