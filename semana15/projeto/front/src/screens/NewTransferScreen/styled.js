import styled from "styled-components"

export const TransferScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 40px 20px 20px 20px;
    align-items: center;
    justify-content: center;
`

export const SectionsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
`

export const ButtonsContainer = styled.div`
    margin-bottom: 30px;
`

export const FormComponent = styled.form`
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    max-width: 220px;
    padding: 20px;
    align-items: center;
    justify-content: space-between;
    background-color: #e1edf0;
`