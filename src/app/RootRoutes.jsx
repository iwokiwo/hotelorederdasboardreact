import React from 'react'
import { Redirect } from 'react-router-dom'
import CategoryRoutes from './views/category/CategoryRoutes'
import chartsRoute from './views/charts/ChartsRoute'
import dashboardRoutes from './views/dashboard/DashboardRoutes'
import itemRoutes from './views/item/ItemRoutes'
import materialRoutes from './views/material-kit/MaterialRoutes'
import UnitRoutes from './views/unit/UnitRoutes'
import SettingRoutes from './views/setting/SettingRoutes'
import CrmRoutes from './views/crm/CrmRoutes'
import PaymentTypeRoutes from './views/paymentType/PaymentTypeRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    // ...itemRoutes,
    // ...CategoryRoutes,
    // ...UnitRoutes,
    // ...PaymentTypeRoutes,
    // ...CrmRoutes,
    ...SettingRoutes,
    ...materialRoutes,
    ...chartsRoute,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
