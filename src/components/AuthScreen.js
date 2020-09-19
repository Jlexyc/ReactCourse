import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateForm, login as loginAction } from '../store/actions/authActions'

import { TextField, FormLabel, Button, CircularProgress } from '@material-ui/core';
import './AuthScreen.css'
import { useHistory } from 'react-router';

const style = {
    textfield: { 
        width: '400px', 
        justifyContent: 'center' 
    },
    actionButton: {
        'margin-top': 20,
    }
}

export default function AuthScreen() {

    const dispatch = useDispatch()

    const onFormChange = ({ nativeEvent: { target }}) => {
        dispatch(updateForm({ [target.id]: target.value }))
    }

    const login = useSelector(state => state.auth.form.login)
    const password = useSelector(state => state.auth.form.password)
    const errorMessage = useSelector(state => state.auth.error)
    const loading = useSelector(state => state.auth.loading)

    const history = useHistory()

    return (
        <div className="LoginFormContainer">
                <form 
                    className="LoginForm"
                    onSubmit={(e) => { 
                        e.preventDefault()
                        dispatch(loginAction(login, password))
                    }}
                >
                    <FormLabel>LOGIN FORM</FormLabel>
                    <TextField 
                        style={style.textfield}
                        id="login" 
                        type="email"
                        label="Email"
                        error={errorMessage}
                        helperText={errorMessage && errorMessage.message}
                        value={login}
                        placeholder="youremail@domain.com"
                        onChange={onFormChange}
                    />
                    <TextField 
                        style={style.textfield}
                        id="password" 
                        type="password"
                        label="Password"
                        value={password}
                        onChange={onFormChange}
                    />
                    <Button 
                        type='submit'
                        style={style.actionButton}
                        color='primary'
                        disabled={loading}
                    > 
                        {loading ? <CircularProgress /> : "Sign In"}
                    </Button>
                </form>
        </div>
    )
}
