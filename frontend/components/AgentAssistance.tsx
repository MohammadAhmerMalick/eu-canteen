'use client'

import Image from 'next/image'
import { useState } from 'react'

import { classnames } from '@/utils'

interface AgentAssistanceProps {
  expended?: boolean
  className?: string
}
const AgentAssistance = ({
  className,
  expended = false,
}: AgentAssistanceProps) => {
  const [expend, setExpend] = useState(expended)

  return (
    <div
      className={classnames(
        'grid h-[72px] grid-cols-[56px_auto_56px] gap-4 overflow-hidden rounded-full bg-white p-2 shadow duration-300',
        expend ? 'max-w-80' : 'max-w-[72px]',
        className
      )}
    >
      <Image
        width={56}
        height={56}
        alt="Agent"
        src="/images/agents/agent-1.png"
        className="w-14 rounded-full border border-primary bg-primary"
        onClick={() => setExpend(!expend)}
      />
      <div className="min-w-40 text-sm">
        <p>Richard Watson</p>
        <p className="text-neutral-500">LUCA</p>
        <p className="text-xs text-neutral-500">Management</p>
      </div>
      <div className="w-14 rounded-full bg-primary" />
    </div>
  )
}

export default AgentAssistance
