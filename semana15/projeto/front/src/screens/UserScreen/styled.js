import styled from "styled-components"

export const UserScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 40px 20px 20px 20px;
    align-items: center;
    justify-content: center;
`

export const AccountContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 140px 1fr;
    column-gap: 20px;
    row-gap: 20px;
    max-width: 600px;
`

export const ButtonsContainer = styled.div`
    margin-bottom: 30px;
`

export const SectionsContainer = styled.div`
    min-width: 250px;
    border: 1px solid gray;
    padding: 20px;
    background-color: #e1edf0;
`

export const TransactionSection = styled(SectionsContainer)`
    grid-column: 1/3;
`

export const BalanceText = styled.h2`
    color: ${props => props.positivo ? "green" : "red"};
    font-size: 18px;
    font-weight: bold;
`

export const ValueText = styled.p`
    color: ${props => props.positivo ? "green" : "red"};
    font-size: 16px;
    font-weight: bold;
`

export const TransactionCard = styled.div`
    border: 1px solid gray;
    padding: 10px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f2f8fa;
`

export const BalanceDataContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const UpdateBalanceButton = styled.button`
    font-size: 16px;
    margin: 0;
    padding: 0 15px;
    height: 24px;
    min-width: 0;
    border-radius: 12px;
`