import axios from "axios"
import React from "react"
import { BASE_URL } from "../../constants/urls"
import { SectionsContainer, BalanceDataContainer, BalanceText, UpdateBalanceButton } from "./styled"

const BalanceData = ({ user, setUser }) => {
    const onClickUpdate = () => {
        axios.put(`${BASE_URL}/user/${user.cpf}/balance`)
            .then((res) => {
                setUser(res.data.user)
            })
            .catch((err) => alert(err.response.data.message))
    }

    return (
        <SectionsContainer>
            <h3>Saldo</h3>
            <BalanceDataContainer>
                <BalanceText positivo={user.balance > 0}>R${String(user.balance.toFixed(2)).replace(".", ",")}</BalanceText>
                <UpdateBalanceButton onClick={onClickUpdate}>Atualizar</UpdateBalanceButton>
            </BalanceDataContainer>
        </SectionsContainer>
    )
}

export default BalanceData