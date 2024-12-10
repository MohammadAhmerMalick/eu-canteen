'use client'

import Image from 'next/image'

import PieGraph from '@/components/graphs/PieGraph'
import LineGraph from '@/components/graphs/LineGraph'
import DoubleBarChart from '@/components/graphs/DoubleBarChart'

const AdminDashboardPage = () => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="grid grid-cols-[70px_auto] items-center gap-4 rounded-lg border border-neutral-300 p-4">
          <Image
            width={200}
            height={200}
            alt="Total Order Received"
            src="/images/dashboard/total-order-received.svg"
          />

          <div>
            <p className="text-2xl font-semibold">357</p>
            <p className="text-sm font-light">Total Order Recieved</p>
            <p className="text-sm font-light">4% (30 days)</p>
          </div>
        </div>
        <div className="grid grid-cols-[70px_auto] items-center gap-4 rounded-lg border border-neutral-300 p-4">
          <Image
            width={200}
            height={200}
            alt="Total Order Completed"
            src="/images/dashboard/total-order-completed.svg"
          />

          <div>
            <p className="text-2xl font-semibold">275</p>
            <p className="text-sm font-light">Total Order Completed</p>
            <p className="text-sm font-light">4% (30 days)</p>
          </div>
        </div>
        <div className="grid grid-cols-[70px_auto] items-center gap-4 rounded-lg border border-neutral-300 p-4">
          <Image
            width={200}
            height={200}
            alt="Total Order Cancled"
            src="/images/dashboard/total-order-cancled.svg"
          />

          <div>
            <p className="text-2xl font-semibold">82</p>
            <p className="text-sm font-light">Total Cancled</p>
            <p className="text-sm font-light">4% (30 days)</p>
          </div>
        </div>
        <div className="grid grid-cols-[70px_auto] items-center gap-4 rounded-lg border border-neutral-300 p-4">
          <Image
            width={200}
            height={200}
            alt="Total Order Recieved"
            src="/images/dashboard/total-revenue.svg"
          />

          <div>
            <p className="text-2xl font-semibold">€4000</p>
            <p className="text-sm font-light">Total Revenue</p>
            <p className="text-sm font-light">4% (30 days)</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        <DoubleBarChart />

        <div className="md:flex">
          <PieGraph />
          <PieGraph />
          <PieGraph />
        </div>
        <LineGraph />
      </div>
    </div>
  )
}

export default AdminDashboardPage
