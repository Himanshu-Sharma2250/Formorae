import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
    <>
        <div className="p-2 flex gap-2">
            <Link to="/">
                Home
            </Link>{' '}

            <Link to="/signup">
                signup
            </Link>{' '}

            <Link to="/signin">
                signin
            </Link>{' '}

            <Link to="/dashboard">
                dashboard
            </Link>{' '}

            <Link to="/forms/$fid" params={{fid: 'dn465'}}>
                submission
            </Link>{' '}

            <Link to="/createForm">
                create-form
            </Link>{' '}
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
    </>
)

export const Route = createRootRoute({ component: RootLayout })