import { createBrowserRouter } from 'react-router-dom'

import Layout from '../layouts/Layout'
import Login from '../pages/public/Login'
import Register from '../pages/public/Register';
import Confirm from '../pages/public/Confirm';

const routes = {
    PUBLIC: {
        INDEX: '/',
        REGISTER: '/register',
        CONFIRM: '/confirmacion',
        FORGOT: '/forgot-password'
    }
}

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
            }, 
            {
                path: "/confirmacion",
                element: <Confirm />
            }
        ]
    }
])

export default router;
export {
    routes
};
