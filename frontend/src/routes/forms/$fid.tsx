import { createFileRoute } from '@tanstack/react-router'
import SubmissionPage from '../../pages/SubmissionPage'

export const Route = createFileRoute('/forms/$fid')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SubmissionPage/>
}
