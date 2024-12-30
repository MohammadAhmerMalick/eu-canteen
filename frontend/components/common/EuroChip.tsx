import Chip from '@/components/common/Chip'

interface EuroChipPorps {
  amount: string | number | undefined
}

const EuroChip = ({ amount = '0' }: EuroChipPorps) => {
  return <Chip>€{parseFloat(amount.toString()).toFixed(2)}</Chip>
}

export default EuroChip
