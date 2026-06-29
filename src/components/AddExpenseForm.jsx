import { useState } from "react";
import {addExpense} from "../services/groupService";
import "./AddExpenseForm.css";

function AddExpenseForm({ members ,groupId,onExpenseAdded}) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [participants, setParticipants] = useState([]);

  const handleParticipant = (userId) => {

    if (participants.includes(userId)) {

        setParticipants(
            participants.filter((id) => id !== userId)
        );

    } else {

        setParticipants(
            [...participants, userId]
        );

    }
  };


    const handleSubmit = async () => {

      console.log({
    description,
    amount,
    participants
});
    if (!description || !amount || participants.length === 0) {
        alert("Please fill all fields");
        return;
    }

    try {

        await addExpense(groupId, {
            description,
            amount: Number(amount),
            participants
        });

        // Clear form
        setDescription("");
        setAmount("");
        setParticipants([]);

        // Refresh parent page
        onExpenseAdded();

    } 
    catch (error) {

        console.log(error.response?.data || error.message);

    }

    };


  



    return (
    <div className="add-expense">

    <h2>➕ Add Expense</h2>

    <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
    />

    <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
    />

    <h3>Select Participants</h3>

    {

        members.map((member) => (

            <div key={member.user.id}>

                <label>

                    <input
                    type="checkbox"
                    checked={participants.includes(member.user.id)}
                    onChange={() => handleParticipant(member.user.id)}
                />
                {member.user.name}
              </label>
            </div>
        ))

    }

    <button onClick={handleSubmit}>

        Add Expense

    </button>

    </div>

  );

}

export default AddExpenseForm;