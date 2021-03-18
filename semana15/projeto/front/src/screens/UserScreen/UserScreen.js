import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { BASE_URL } from "../../constants/urls"
import { goToHomeScreen, goToNewTransferScreen } from "../../routes/coordinator"
import { UserScreenContainer, AccountContainer, ButtonsContainer } from './styled'
import BalanceData from './BalanceData'
import PersonalData from './PersonalData'
import StatementData from './StatementData'

const UserScreen = () => {
    const [user, setUser] = useState({})
    const { cpf } = useParams()
    const history = useHistory()

    useEffect(() => {
        axios.get(`${BASE_URL}/user/${cpf}`)
            .then((res) => setUser(res.data))
            .catch((err) => alert(err.response.data.message))
    }, [cpf])

    return (
        <UserScreenContainer>
            <h1>Área do Usuário</h1>
            <ButtonsContainer>
                <button onClick={() => goToHomeScreen(history)}>Voltar para Home</button>
                <button onClick={() => goToNewTransferScreen(history, cpf)}>Nova Transferência</button>
            </ButtonsContainer>
            {Object.entries(user).length === 0 ? "Carregando..." : (
                <>
                    <h2>Bem-vindo(a), {user.name}!</h2>
                    <AccountContainer>
                        <PersonalData user={user}/>
                        <BalanceData user={user} setUser={setUser}/>
                        <StatementData user={user}/>
                    </AccountContainer>
                </>
            )}
        </UserScreenContainer>
    )
}

export default UserScreen