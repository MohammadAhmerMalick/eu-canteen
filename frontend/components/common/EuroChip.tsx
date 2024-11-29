import React from 'react'

interface EuroChipPorps {
  amount: string | undefined
}

const EuroChip = ({ amount = '0' }: EuroChipPorps) => {
  return (
    <span className="rounded-lg bg-primary-light p-2 text-primary">
      €{parseFloat(amount).toFixed(2)}
    </span>
  )
}

export default EuroChip
