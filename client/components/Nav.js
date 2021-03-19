import Link from 'next/link'
import { useContext } from 'react'
import { Context } from '../context'
import firebase from '../firebase'
import {useRouter} from 'next/router'

function Nav() {
    const { state: { user }, dispatch } = useContext(Context)
    const router = useRouter()

    const handleLogout = async () => {
        await firebase.auth().signOut()
        dispatch({
            type: 'LOGOUT'
        })
        router.push('/login')
    }

    return (
        <nav className="nav d-flex justify-content-between" style={{ backgroundColor: '#e3f2fd' }}>
            <Link href="/"><a className="nav-link">Home</a></Link>

            <Link href={user ? "/hotel/new" : "/login"}><a className="nav-link">Submit Hotel</a></Link>
            
            {user ? (
                <a className="nav-link" onClick={handleLogout}>Logout</a>
            ) : (
                <Link href="/login"><a className="nav-link">Login</a></Link>
            )}
        </nav>
    )
}

export default Nav
