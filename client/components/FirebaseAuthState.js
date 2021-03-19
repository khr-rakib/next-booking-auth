import React, { useContext, useEffect } from 'react'
import firebase from '../firebase'
import { Context } from '../context'
import { axiosAuth } from '../actions/axios'
import { setCookie, destroyCookie } from 'nookies'

function FirebaseAuthState({children}) {
    const { dispatch } = useContext(Context)
    
    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                dispatch({
                    type: 'LOGOUT'
                })
                destroyCookie(null, 'token')
                setCookie(null, 'token', '', {})
            } else {
                const { token } = await user.getIdTokenResult();
                // set token to cookie
                destroyCookie(null, 'token')
                setCookie(null, 'token', token, {})
                
                axiosAuth.post('/current-user', {}).then(res => {
                    dispatch({
                        type: 'LOGIN',
                        payload: res.data
                    })
                })
            }
        })
    }, [])


    return (
        <>
         {children}   
        </>
    )
}

export default FirebaseAuthState
