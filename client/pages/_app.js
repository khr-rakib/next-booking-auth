import Nav from '../components/Nav'
import {Provider} from '../context'
import { ToastContainer } from 'react-toastify';
import FirebaseAuthState from '../components/FirebaseAuthState'

import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({Component, pageProps}) {
    return (
        <Provider>
            <FirebaseAuthState>
                <Nav />
                <ToastContainer />
                <Component {...pageProps} />
            </FirebaseAuthState>
        </Provider>
    )
}