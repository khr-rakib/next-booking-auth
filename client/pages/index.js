import {Context} from '../context'
import {useContext} from 'react'

const Home = () => {
    const { state } = useContext(Context);

    return (
        <div className="container">
            <h2>Home Page</h2>
            <p>This page is for public view. Anyone can access it. If you login, you can see details here.</p>
            <pre> {JSON.stringify(state, null, 4)} </pre>
        </div>
    )
}


export default Home;