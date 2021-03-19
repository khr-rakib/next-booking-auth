import React from 'react'
import { parseCookies } from 'nookies'
import axios from 'axios'

export default function NewBooking() {
    return (
        <div className="container">
            <h2>Post a new hotel for booking</h2>
            <p className="lead">This is a protected page for logged in user only</p>
        </div>
    )
}

export async function getServerSideProps(context) {
    try {
        const cookies = parseCookies(context)
        const {data} = await axios.get(`${process.env.api}/private-route`, {
            headers: {
                token: cookies.token
            }
        })
        if (data.ok) return { props: {} }        
    } catch (error) {
        return {
            redirect: {
                parmanent: false,
                destination: '/login'
            },
            props: {}
        }        
    }
}
