import { Login } from "../Pages/Login"
import { Results } from "../Pages/Results"
import { Register } from "../Pages/Register"
import { Clicker } from "../Pages/Clicker"
import { Main } from "../Pages/Main"
interface RouteElement {
    element: React.JSX.Element
    icon?: React.JSX.Element
    path: string
    title: string
}

export const routes: Array<RouteElement> = [
    {
        element: <Main/>,
        path: '/',
        title: "Main"
    },
    {
        element: <Results/>,
        path: '/results',
        title: "Results"
    },
    {
        element: <Register/>,
        path: '/register',
        title: "Register"
    },
    {
        element: <Login/>,
        path: '/login',
        title: "Login"
    },
    {
        element: <Clicker/>,
        path: '/clicker',
        title: "Clicker"
    }
]