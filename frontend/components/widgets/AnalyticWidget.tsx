import Image from 'next/image'

import EuroChip from '@/components/common/EuroChip'

interface AnalyticWidgetProps {
  image: string
  title: string
  cost: string | number
  quantity: string | number
}

const AnalyticWidget = ({
  cost,
  image,
  title,
  quantity,
}: AnalyticWidgetProps) => {
  return (
    <div className="grid grid-cols-[40px_auto] items-center gap-2 rounded-lg border border-neutral-300 p-2 md:grid-cols-[70px_auto] md:gap-4 md:p-4">
      <Image alt={title} width={64} height={64} src={image} className="w-16" />

      <div>
        <p className="text-lg font-semibold md:text-2xl">
          {quantity.toString()}
        </p>
        <p className="text-sm font-light">{title}</p>
        <p className="mt-2 text-sm font-normal">
          <EuroChip amount={cost} />
        </p>
      </div>
    </div>
  )
}

export default AnalyticWidget
