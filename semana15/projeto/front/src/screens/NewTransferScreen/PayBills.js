import React from "react"
import axios from 'axios'
import useForm from '../../hooks/useForm'
import { FormComponent } from './styled'
import { BASE_URL } from '../../constants/urls'

const PayBills = (props) => {
    const [form, onChange, clearFields] = useForm({ value: "", date: "", description: "" })

    const onClickSend = (event) => {
        event.preventDefault()

        axios.post(`${BASE_URL}/user/${props.cpf}/transaction/sub`, form)
            .then((res) => {
                alert(res.data.message)
                clearFields()
            })
            .catch((err) => alert(err.response.data.message))
    }

    return (
        <FormComponent onSubmit={onClickSend}>
            <h2>Pagar Contas</h2>

            <input
                placeholder={"Valor"}
                name={"value"}
                value={form.value}
                onChange={onChange}
                required
                type={"number"}
            />

            <input
                placeholder={"Data"}
                name={"date"}
                value={form.date}
                onChange={onChange}
                pattern={"((0[1-9]|1[0-9]|2[0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4})|[0-9]{4}|(0[1-9]|1[012]).[0-9]{4}"}
                title={"Insira uma data válida no formato: dd/mm/aaaa"}
            />

            <input
                placeholder={"Descrição"}
                name={"description"}
                value={form.description}
                onChange={onChange}
                required
                type={"text"}
            />
            <button type={"submit"}>Pagar</button>
        </FormComponent>
    )
}

export default PayBills