import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const ItemList = Loadable(lazy(() => import('./ItemList')))

const itemRoutes = [
    {
        path: '/item/item-list',
        element: <ItemList />,
        auth: authRoles.admin,
    },
]

export default itemRoutes
