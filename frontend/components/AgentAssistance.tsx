'use client'

import Image from 'next/image'
import { useState } from 'react'

import { classnames } from '@/utils'
import AiOutlinePhone from '@/icons/AiOutlinePhone'

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
        'grid h-[72px] grid-cols-[56px_auto_56px] items-center gap-4 overflow-hidden rounded-full bg-white p-2 shadow duration-300',
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
        <p>LUCA</p>
        <p className="text-xs text-neutral-500">Management</p>
      </div>
      <a
        href="https://wa.me/+393420500567"
        target="_blank"
        className="flex h-full w-14 -scale-x-100 items-center justify-center rounded-full bg-primary text-3xl text-white"
      >
        <AiOutlinePhone />
      </a>
    </div>
  )
}

export default AgentAssistance
