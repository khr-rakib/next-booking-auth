import firebase from '../firebase'
import { useState } from 'react'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { GoogleOutlined, SyncOutlined } from '@ant-design/icons'
import LoginRegisterForm from '../components/LoginRegisterForm'
import Link from 'next/link'

function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPass, setLoginPass] = useState('');

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPass, setRegisterPass] = useState('');

    const register = async () => {
        setLoading(true)
        await firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPass)
            .then(() => {
                router.push('/')
            }).catch(err => toast.error(err.message))
    }

    const login = async () => {
        setLoading(true)
        await firebase.auth().signInWithEmailAndPassword(loginEmail, loginPass)
            .then(() => {
                router.push('/')
            }).catch(err => toast.error(err.message))
    }

    const googleLogin = async () => {
        await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
                router.push('/')
            }).catch(err => toast.error(err.message))
    }


    return (
        <div className="container">
            <h2 className="text-center py-4 display-4">{loading ? <SyncOutlined spin /> :  'Login/Register'}</h2>
            <div className="row">
                <div className="col-md-12">
                    <Button onClick={googleLogin} className="mb-3 col-md-6 offset-md-3" type="danger" shape="round" icon={<GoogleOutlined/>} block>Login with Google</Button>
                </div>
                <div className="col-md-6">
                    <LoginRegisterForm email={loginEmail} setEmail={setLoginEmail} pass={loginPass} setPass={setLoginPass} buttonText="Login" handleSubmit={login} />
                </div>
                <div className="col-md-6">
                    <LoginRegisterForm email={registerEmail} setEmail={setRegisterEmail} pass={registerPass} setPass={setRegisterPass} buttonText="Register" handleSubmit={register} />
                </div>
                <div className="col-md-12">
                    <Link href="/reset-password"><a className="btn btn-outline-danger btn-sm mt-5">Reset Password</a></Link>
                </div>
            </div>            
        </div>
    )
}

export default Login
