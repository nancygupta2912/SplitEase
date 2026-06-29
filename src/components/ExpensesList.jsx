function ExpensesList({ expenses }) {

    return (
        <div>
            <h2>💸 Expenses</h2>
            {
                expenses.map((expense) => (
                    <div
                        className="expense-card"
                        key={expense.id}
                    >
                        <h3>{expense.description}</h3>

                        <div className="expense-header">

                            <h3>{expense.description}</h3>
                            <span className="expense-amount">
                                ₹{expense.amount}
                            </span>

                        </div>

                        <p className="paid-by">
                            Paid by <strong>{expense.payer.name}</strong>
                        </p>                        

                        <p>Split Between:</p>

                        <ul>

                            {

                                expense.splits.map((split) => (

                                    <li key={split.userId}>

                                        {split.user.name} — ₹{split.amount}

                                    </li>

                                ))
                            }
                        </ul>
                    </div>
                ))
            }
        </div>

    );

}

export default ExpensesList;