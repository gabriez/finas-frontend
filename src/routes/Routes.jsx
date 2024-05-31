import { createBrowserRouter } from 'react-router-dom'

import Layout from '../layouts/Layout'
import Login from '../pages/Login'
import Register from '../pages/Register';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true, 
                element: <Login/>
            }, 
            {
                path: "/register",
                element: <Register />,
            }
        ]
    }
])

export default router;