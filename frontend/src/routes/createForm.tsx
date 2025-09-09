import { createFileRoute } from '@tanstack/react-router'
import CreateForm from '../pages/CreateForm'

export const Route = createFileRoute('/createForm')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateForm/>
}
