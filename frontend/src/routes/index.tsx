import { createFileRoute } from '@tanstack/react-router'
// import NavBar from "../components/NavBar.js"
import LandingPage from '../pages/LandingPage.js'

export const Route = createFileRoute("/")({
    component: Index,
})

function Index() {
    return (
        <LandingPage/>
    )
}