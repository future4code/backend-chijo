import React, { useEffect, useState } from "react"
import axios from 'axios'
import useForm from '../../hooks/useForm'
import { FormComponent } from './styled'
import { BASE_URL } from '../../constants/urls'

const ClientTransfer = (props) => {
    const [form, onChange, clearFields] = useForm({ value: "", recipientName: "" })
    const [user, setUser] = useState({})
    const [accountCpf, setAccountCpf] = useState("")

    useEffect(() => {
        axios.get(`${BASE_URL}/user/${props.cpf}`)
            .then((res) => setUser(res.data))
            .catch((err) => alert(err.response.data.message))
    }, [props.cpf])

    const handleAccountCpf = (event) => {
        setAccountCpf(event.target.value)
    }

    const onClickSend = (event) => {
        event.preventDefault()
        const body = { yourName: user.name, ...form }
        axios.post(`${BASE_URL}/user/${user.cpf}/transaction/${accountCpf}`, body)
            .then((res) => {
                alert(res.data.message)
                clearFields()
                setAccountCpf("")
            })
            .catch((err) => alert(err.response.data.message))
    }

    return (
        <FormComponent onSubmit={onClickSend}>
            <h2>Para outra Conta</h2>

            <input
                placeholder={"Valor"}
                name={"value"}
                value={form.value}
                onChange={onChange}
                required
                type={"number"}
            />

            <input
                placeholder={"CPF do Destinatário"}
                value={accountCpf}
                onChange={handleAccountCpf}
                required
                type={"text"}
                pattern={"^([0-9]){3}.([0-9]){3}.([0-9]){3}-([0-9]){2}$"}
                title={"CPF deve ser no formato: 000.000.000-00"}
            />

            <input
                placeholder={"Nome do Destinatário"}
                name={"recipientName"}
                value={form.recipientName}
                onChange={onChange}
                required
                type={"text"}
            />
            <button type={"submit"}>Enviar</button>
        </FormComponent>
    )
}

export default ClientTransfer