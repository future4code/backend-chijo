import React from "react"
import { SectionsContainer } from './styled'

const PersonalData = ({ user }) => {
    return (
        <SectionsContainer>
            <h3>Dados Pessoais</h3>
            <p><b>CPF:</b> {user.cpf}</p>
            <p><b>Data de Nascimento:</b> {user.birthdate}</p>
        </SectionsContainer>
    )
}

export default PersonalData