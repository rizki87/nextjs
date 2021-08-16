import useSWR from 'swr'

import DashboardShell from '@/components/DashboardShell'
import EmptyState from '@/components/EmptyState'
import fetcher from '@/utils/fetcher'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import SiteTable from '@/components/SiteTable'
import { useAuth } from '@/lib/auth'

export default function Dashboard() {
  const { user } = useAuth()
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher)

  // console.log("data ", data)

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  )
}
