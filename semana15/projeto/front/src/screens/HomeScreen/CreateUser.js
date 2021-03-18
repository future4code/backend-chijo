import React from "react"
import axios from "axios"
import useForm from '../../hooks/useForm'
import { BASE_URL } from "../../constants/urls"
import { FormComponent } from './styled'

const CreateUser = () => {
    const [form, onChange, clearFields] = useForm({ cpf: "", name: "", birthdate: "" })

    const onClickCreate = (event) => {
        event.preventDefault()

        axios.post(`${BASE_URL}/user`, form)
            .then((res) => {
                alert(res.data.message)
                clearFields()
            })
            .catch((err) => alert(err.response.data.message))
    }

    return (
        <FormComponent onSubmit={onClickCreate}>
            <h2>Criar Usuário</h2>
            <input
                placeholder={"CPF"}
                name={"cpf"}
                value={form.cpf}
                onChange={onChange}
                required
                type={"text"}
                pattern={"^([0-9]){3}.([0-9]){3}.([0-9]){3}-([0-9]){2}$"}
                title={"CPF deve ser no formato: 000.000.000-00"}
            />
            <input
                placeholder={"Nome"}
                name={"name"}
                value={form.name}
                onChange={onChange}
                required
                type={"text"}
            />
            <input
                placeholder={"Data de Nascimento"}
                name={"birthdate"}
                value={form.birthdate}
                onChange={onChange}
                required
                pattern={"((0[1-9]|1[0-9]|2[0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4})|[0-9]{4}|(0[1-9]|1[012]).[0-9]{4}"}
                title={"Insira uma data válida no formato: dd/mm/aaaa"}
            />
            <button type={"submit"}>Criar Conta</button>
        </FormComponent>
    )
}

export default CreateUser