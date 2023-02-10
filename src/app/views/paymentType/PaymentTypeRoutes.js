import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const PaymentTypeList = Loadable(lazy(() => import('./PaymentTypeList')))

const PaymentTypeRoutes = [
    {
        path: '/paymentType/paymentType-list',
        element: <PaymentTypeList />,
        auth: authRoles.admin,
    },
]

export default PaymentTypeRoutes
