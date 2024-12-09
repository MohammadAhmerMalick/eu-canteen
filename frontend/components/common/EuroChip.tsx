import Chip from '@/components/common/Chip'

interface EuroChipPorps {
  amount: string | undefined
}

const EuroChip = ({ amount = '0' }: EuroChipPorps) => {
  return <Chip>€{parseFloat(amount).toFixed(2)}</Chip>
}

export default EuroChip
