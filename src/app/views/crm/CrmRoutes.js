import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const CouponList = Loadable(lazy(() => import('./CouponList')))


const CrmRoutes = [
    {
        path: '/crm/coupon-list',
        element: <CouponList />,
        auth: authRoles.admin,
    },
]

export default CrmRoutes
