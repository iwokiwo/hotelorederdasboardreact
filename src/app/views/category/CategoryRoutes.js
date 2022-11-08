import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const CategoryList = Loadable(lazy(() => import('./CategoryList')))

const CategoryRoutes = [
    {
        path: '/category/category-list',
        element: <CategoryList />,
        auth: authRoles.admin,
    },
]

export default CategoryRoutes
