import useAuth from 'app/hooks/useAuth'
import { flat } from 'app/utils/utils'
import React, { useState, useEffect, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AppContext from '../contexts/AppContext'
import { AllPages } from '../routes/routes'

const getUserRoleAuthStatus = (pathname, user, routes) => {

    if (!user) {
        return false
    }
    const matched = routes.find((r) => r.path === pathname)

    const authenticated =
        matched && matched.auth && matched.auth.length
            ? matched.auth.includes(user.role)
            : true
    console.log(matched, user)
    return authenticated
}

const AuthGuard = ({ children }) => {
    JSON.parse(localStorage.getItem('useAuth')) === null && localStorage.setItem('useAuth',JSON.stringify({
        data: [],
        isAuthenticated: false,
        isInitialised: false
    }))

    const { isAuthenticated, data } = JSON.parse(localStorage.getItem('useAuth'))

    // return <>{isAuthenticated ? children : <Navigate to="/session/signin" />}</>

    const [previouseRoute, setPreviousRoute] = useState(null)
    const { pathname } = useLocation()
    const routes = flat(AllPages())

    console.log("useAuth()",useAuth())

    const isUserRoleAuthenticated = getUserRoleAuthStatus(
        pathname,
        data,
        routes
    )
    let authenticated = isAuthenticated && isUserRoleAuthenticated


    // IF YOU NEED ROLE BASED AUTHENTICATION,
    // UNCOMMENT ABOVE TWO LINES, getUserRoleAuthStatus METHOD AND user VARIABLE
    // AND COMMENT OUT BELOW LINE

    // let authenticated = isAuthenticated

    useEffect(() => {
        if (previouseRoute !== null) setPreviousRoute(pathname)
    }, [pathname, previouseRoute])

    if (authenticated) return <>{children}</>
    else {
        return (
            <Navigate
                to="/session/signin"
                state={{ redirectUrl: previouseRoute }}
            />
            // <Redirect
            //     to={{
            //         pathname: '/session/signin',
            //         state: { redirectUrl: previouseRoute },
            //     }}
            // />
        )
    }
}

export default AuthGuard
