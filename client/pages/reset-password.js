import React, { useEffect, useState, useContext } from 'react'
import firebase from '../firebase'
import { useRouter } from 'next/router'
import { Context } from '../context'
import { toast } from 'react-toastify'

function ResetPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    
    let router = useRouter()

    const { state: { user } } = useContext(Context)

    useEffect( () => {
        if (user !== null) {
            router.push('/')
        }
    }, [user])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const config = {
            url: process.env.passwordResetRedirect,
            handleCodeInApp: true
        }

        await firebase.auth().sendPasswordResetEmail(email, config).then(() => {
            setEmail('')
            setLoading(false)
            toast.info('Check your email for password reset link')
        }).catch(err => {
            setLoading(false)
            toast.error(err.message)
        })
    }



    return (
        <div className="my-5 container col-md-6 offset-md-3">
            <h2>Reset Password</h2>
            <p className="lead">If you have already registered, you can enter your email address to receive a password reset link</p>

            <form onSubmit={handleSubmit}>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Type your email" autoFocus={true} />
                <button type="submit" className="btn mt-3 btn-info btn-block" disabled={!email || loading}>
                    {loading ? 'Processing...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}

export default ResetPassword
