import { Navigate } from 'react-router-dom'
import Wallhaven from "../pages/Wallhaven"
import Collections from "../pages/Collections"
import Settings from "../pages/Settings"

const routes = [
    {
        path: "/wallhaven",
        element: <Wallhaven />,
    },
    {
        path: "/collections",
        element: <Collections />,
    },
    {
        path: "/Settings",
        element: <Settings />,
    },
    {
        path: "/",
        element: <Navigate to='/wallhaven' />
    }
]

export default routes