import React from 'react'
import { TransactionSection, TransactionCard, ValueText } from "./styled"

const StatementData = ({user}) => {
    return (
        <TransactionSection>
            <h3>Transações</h3>
            {user.statement && user.statement.map((t) => {
                return (
                    <TransactionCard key={t.description + t.value}>
                        <p><b>{t.date}</b> - {t.description}</p>
                        <ValueText positivo={t.value > 0}>R${String(t.value.toFixed(2)).replace(".", ",").replace("-", "")}</ValueText>
                    </TransactionCard>
                )
            })}
        </TransactionSection>
    )
}

export default StatementData
