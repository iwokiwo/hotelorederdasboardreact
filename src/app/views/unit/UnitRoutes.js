import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const UnitList = Loadable(lazy(() => import('./UnitList')))

const UnitRoutes = [
    {
        path: '/unit/unit-list',
        element: <UnitList />,
        auth: authRoles.admin,
    },
]

export default UnitRoutes
