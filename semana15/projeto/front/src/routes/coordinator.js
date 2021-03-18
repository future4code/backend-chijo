export const goToAdminScreen = (history) => {
    history.push("/admin")
}

export const goToHomeScreen = (history) => {
    history.push("/")
}

export const goToUserScreen = (history, cpf) => {
    history.push(`/user/${cpf}`)
}

export const goToNewTransferScreen = (history, cpf) => {
    history.push(`/user/${cpf}/transfer`)
}