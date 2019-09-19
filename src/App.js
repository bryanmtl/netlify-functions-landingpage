import React, { Component } from 'react'
import axios from 'axios'
import './bootstrap.css'
import './App.css'

import logo from './logo.png'

const formAPI = '/.netlify/functions/signup'

export default class App extends Component {
    state = {
        loading: false,
        success: false,
        error: false
    }
    handleSubmit = (event, data) => {
        event.preventDefault()
        const email = this.email.value

        if (!email) {
            alert('Please email your email')
        }

        this.setState({
            loading: true
        })

        formHandler(email).then(() => {
            this.setState({
                success: true,
                loading: false
            })
        }).catch((e) => {
            this.setState({
                error: true,
                loading: false
            })
        })
    }
    renderForm() {
        const { success, loading } = this.state
        const buttonText = (loading) ? '...' : 'Submit'
        const handler = (loading) ? noOp : this.handleSubmit

        /* if they submitted the form, show thanks */
        if (success) {
            return (
                <div>
                <h2>Thanks for signing up!</h2>
            </div>
        )
        }

        return (
            <form onSubmit={handler}>
            <input
        type="email"
        name="email"
        className="sign-up"
        ref={input => this.email = input}
        placeholder="Notify me when available"
        required
        />
        <button className="btn btn-lg sign-up-button" type="submit">
            {buttonText}
            </button>
            </form>
    )
    }
    render() {
        return (
            <div className="App">
            <div className="landing-page">
            <div className='container'>
                <div className="row main">
                <h3 className="logo">
                    <img src={logo} alt="Racines Wine Logo" />
                </h3>
                <p>
                    <strong>Etienne de Montille and Brian Sieve</strong><br/>
                    (Burgundy), <strong>Rodolphe Peters</strong> (Champagne)<br/>
                    <strong>and Justin Willett</strong> (Santa Barbara, CA)<br/>
                    <strong>decided to join their individual experiences<br/>
                    in hand crafting wines of purity and<br/>
                    transparency to create a range of Pinot Noir<br/>
                    and Chardonnay from the cool climate of<br/>
                    the Santa Rita Hills in California.<br/>
                    </strong>
                </p>

                <p className="alcohol-copy">
                    <strong>13% ALC./VOL.</strong>
                </p>

                </div>

                <div className="row form">
                    {this.renderForm()}
                </div>


            </div>
            </div>
            </div>
    )
    }
}

function formHandler(email) {
    const data = {
        email: email
    }
    return axios({
        method: 'post',
        url: formAPI,
        data: data,
    })
}

function noOp() {
    console.log('submission in progress')
}