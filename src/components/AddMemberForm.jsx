import { useState } from "react";
import { addMember } from "../services/groupService";

function AddMemberForm({ groupId, onMemberAdded }) {

    const [email, setEmail] = useState("");

    const handleAddMember = async () => {

        if (!email.trim()) {
            alert("Enter member email");
            return;
        }

        try {

            await addMember(groupId, email);

            setEmail("");

            onMemberAdded();

            alert("Member Added Successfully");

        } catch (error) {

            alert(error.response?.data?.error || "Something went wrong");

        }

    };

    return (

        <div className="add-member">

            <h2>➕ Add Member</h2>

            <input
                type="email"
                placeholder="Enter member email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={handleAddMember}>
                Add Member
            </button>

        </div>

    );

}

export default AddMemberForm;