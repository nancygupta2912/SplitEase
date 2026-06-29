function BalanceList({ balances }) {

    return (
        <div className="section">
            <h2>⚖️ Balances</h2>
            {
                balances.map((balance) => (
                    <div
                        className="balance-card"
                        key={balance.userId}
                    >
                        <h3>{balance.name}</h3>

                        <p
                            className={
                                balance.balance >= 0
                                    ? "balance-positive"
                                    : "balance-negative"
                            }
                        >

                            {balance.balance >= 0
                                ? `Gets ₹${balance.balance}`
                                : `Owes ₹${Math.abs(balance.balance)}`}
                        </p>
                    </div>
                ))
            }
        </div>
    );
}

export default BalanceList;