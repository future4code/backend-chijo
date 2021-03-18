import React from "react"
import { TransferScreenContainer, SectionsContainer, ButtonsContainer } from "./styled"
import { goToUserScreen, goToHomeScreen } from '../../routes/coordinator'
import { useParams, useHistory } from 'react-router-dom'
import ClientTransfer from "./ClientTransfer"
import PayBills from './PayBills'

const NewTransferScreen = () => {
    const { cpf } = useParams()
    const history = useHistory()

    return (
        <TransferScreenContainer>
            <h1>Nova Transferência</h1>
            <ButtonsContainer>
                <button onClick={() => goToHomeScreen(history)}>Voltar para Home</button>
                <button onClick={() => goToUserScreen(history, cpf)}>Voltar para Conta</button>
            </ButtonsContainer>
            <SectionsContainer>
                <PayBills cpf={cpf}/>
                <ClientTransfer cpf={cpf}/>
            </SectionsContainer>

        </TransferScreenContainer>
    )
}

export default NewTransferScreen