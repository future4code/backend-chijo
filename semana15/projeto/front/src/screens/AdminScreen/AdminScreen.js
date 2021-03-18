import React, { useEffect, useState } from "react"
import axios from "axios"
import { AdminScreenContainer, UserCard } from "./styled"
import { BASE_URL } from '../../constants/urls'
import { goToHomeScreen } from "../../routes/coordinator"
import { useHistory } from 'react-router-dom'

const AdminScreen = () => {
    const [users, setUsers] = useState([])
    const history = useHistory()

    useEffect(() => {
        axios.get(`${BASE_URL}/user`)
            .then((res) => setUsers(res.data))
            .catch((err) => alert(err.response.data.message))
    }, [])

    const usersToRender = users.map((u) => {
        return (
            <UserCard key={u.cpf}>
                <p><b>CPF:</b> {u.cpf}</p>
                <p><b>Nome:</b> {u.name}</p>
                <p><b>Data de Nascimento:</b> {u.birthdate}</p>
                <p><b>Saldo:</b> R${String(u.balance.toFixed(2)).replace(".",",")}</p>
            </UserCard>
        )
    })

    return (
        <AdminScreenContainer>
            <h1>Área Administrativa</h1>
            <button onClick={() => goToHomeScreen(history)}>Voltar para Home</button>
            {users.length > 0 ? usersToRender : "Carregando..."}
        </AdminScreenContainer>
    )
}

export default AdminScreen