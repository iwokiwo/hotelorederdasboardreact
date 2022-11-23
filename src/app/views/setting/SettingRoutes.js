import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const CompanyForm = Loadable(lazy(() => import('./CompanyForm')))

const SettingRoutes = [
    {
        path: '/setting/setting-company',
        element: <CompanyForm />,
        auth: authRoles.admin,
    },
]

export default SettingRoutes
