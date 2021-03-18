import React from "react"
import NonClientTransfer from './NonClientTransfer'
import FakeLogin from './FakeLogin'
import CreateUser from './CreateUser'
import { AdminContainer, HomeScreenContainer, FormsContainer } from "./styled"
import { goToAdminScreen } from '../../routes/coordinator'
import { useHistory } from "react-router-dom"

const HomeScreen = () => {
    const history = useHistory()
    return (
        <HomeScreenContainer>
            <h1>Sistema Bancário</h1>
            <FormsContainer>
                <NonClientTransfer />
                <CreateUser />
                <FakeLogin />
                <AdminContainer>
                    <h2>Área Administrativa</h2>
                    <button onClick={() => goToAdminScreen(history)}>Entrar</button>
                </AdminContainer>
            </FormsContainer>
        </HomeScreenContainer>
    )
}

export default HomeScreen