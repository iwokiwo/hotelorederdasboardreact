import AuthGuard from 'app/auth/AuthGuard'
import NotFound from 'app/views/sessions/NotFound'
import chartsRoute from 'app/views/charts/ChartsRoute'
import materialRoutes from 'app/views/material-kit/MaterialRoutes'
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes'
import itemRoutes from 'app/views/item/ItemRoutes'
import sessionRoutes from 'app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'
import CategoryRoutes from 'app/views/category/CategoryRoutes'
import UnitRoutes from 'app/views/unit/UnitRoutes'
import SettingRoutes from 'app/views/setting/SettingRoutes'
import CrmRoutes from 'app/views/crm/CrmRoutes'

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [
                ...dashboardRoutes, 
                ...itemRoutes, 
                ...CategoryRoutes,
                ...UnitRoutes,
                ...CrmRoutes,
                ...SettingRoutes,
                ...chartsRoute, 
                ...materialRoutes],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="dashboard/default" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
