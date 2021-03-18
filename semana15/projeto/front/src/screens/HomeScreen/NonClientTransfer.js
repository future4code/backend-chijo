import React, { useState } from "react"
import axios from 'axios'
import useForm from '../../hooks/useForm'
import { BASE_URL } from '../../constants/urls'
import { FormComponent } from './styled'

const NonClientTransfer = () => {
    const [form, onChange, clearFields] = useForm({ name: "", value: "" })
    const [cpf, setCpf] = useState("")

    const handleCpf = (event) => {
        setCpf(event.target.value)
    }

    const onClickSend = (event) => {
        event.preventDefault()

        axios.put(`${BASE_URL}/user/${cpf}/transaction/add`, form)
            .then((res) => {
                alert(res.data.message)
                clearFields()
                setCpf("")
            })
            .catch((err) => alert(err.response.data.message))
    }

    return (
        <FormComponent onSubmit={onClickSend}>
            <h2>Transferir</h2>
            <input
                placeholder={"CPF da Conta"}
                value={cpf}
                onChange={handleCpf}
                required
                type={"text"}
                pattern={"^([0-9]){3}.([0-9]){3}.([0-9]){3}-([0-9]){2}$"}
                title={"CPF deve ser no formato: 000.000.000-00"}

            />
            <input
                placeholder={"Nome do Destinatário"}
                name={"name"}
                value={form.name}
                onChange={onChange}
                required
                type={"text"}
            />
            <input
                placeholder={"Valor da Transferência"}
                name={"value"}
                value={form.value}
                onChange={onChange}
                required
                type={"number"}
            />
            <button type={"submit"}>Enviar</button>
        </FormComponent>
    )
}

export default NonClientTransfer