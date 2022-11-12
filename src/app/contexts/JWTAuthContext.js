import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    data: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        console.log("lewat session")
        localStorage.removeItem('accessToken')
        localStorage.removeItem('useAuth')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, data } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                data,
            }
        }
        case 'LOGIN': {
            const { data } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                data,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                data: null,
            }
        }
        case 'REGISTER': {
            const { data } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                data,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (email, password) => {
        const response = await axios.post('/api/v1/sessions', {
            email,
            password,
        })
        console.log(response)
        const { meta, data } = response.data

        setSession(data.token)

        localStorage.setItem('useAuth',JSON.stringify({
            data: data,
            isAuthenticated: true,
            isInitialised: true,
            method: "JWT"
        }))

        dispatch({
            type: 'LOGIN',
            payload: {
                data,
            },
        })
    }

    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        console.log("logout lewat")
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ; (async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')
                // console.log("isValidToken(accessToken)",isValidToken(accessToken))
               // if (accessToken && isValidToken(accessToken)) {
                if (accessToken) {
                   // console.log("localStorage",localStorage.setItem('useAuth'))
                    setSession(accessToken)
                    // const response = await axios.get('/api/auth/profile')
                    // const { user } = response.data

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            //user:[],
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
