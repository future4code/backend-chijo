import React, { useState } from "react"
import axios from 'axios'
import { FormComponent } from './styled'
import { BASE_URL } from '../../constants/urls'
import { goToUserScreen } from '../../routes/coordinator'
import { useHistory } from "react-router-dom"

const FakeLogin = () => {
    const [cpf, setCpf] = useState("")
    const history = useHistory()

    const handleCpf = (event) => {
        setCpf(event.target.value)
    }

    const onClickLogin = (event) => {
        event.preventDefault()
        axios.get(`${BASE_URL}/user/${cpf}`)
            .then(() => {
                setCpf("")
                goToUserScreen(history, cpf)
            })
            .catch((err) => alert(err.response.data.message))
    }

    return (
        <FormComponent>
            <h2>Login</h2>
            <input
                placeholder={"CPF da Conta"}
                value={cpf}
                onChange={handleCpf}
                required
                pattern={"^([0-9]){3}.([0-9]){3}.([0-9]){3}-([0-9]){2}$"}
                title={"CPF deve ser no formato: 000.000.000-00"}
            />
            <button onClick={onClickLogin}>Login</button>
        </FormComponent>
    )
}

export default FakeLogin