import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const Analytics = Loadable(lazy(() => import('./Analytics')))

const itemRoutes = [
    {
        path: '/dashboard/default',
        element: <Analytics />,
  
    },
]

export default itemRoutes
