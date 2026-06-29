import { useParams ,useNavigate} from "react-router-dom";
import { getGroupMembers,getGroupExpenses, getBalances,getGroup} from "../services/groupService";
import { useEffect, useState } from "react";
import MembersList from "../components/MembersList";
import ExpensesList from "../components/ExpensesList";
import BalanceList from "../components/BalanceList";
import AddExpenseForm from "../components/AddExpenseForm";
import AddMemberForm from "../components/AddMemberForm";

import "./GroupDetails.css";

function GroupDetails() {
    const navigate=useNavigate();
    const { id } = useParams();
    const [members, setMembers] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [balances, setBalances] = useState([]);
    const [group, setGroup] = useState(null);


    const fetchData = async () => {
        try{
            const groupData = await getGroup(id);
            setGroup(groupData);
            const data = await getGroupMembers(id);
            setMembers(data);
            const expenseData = await getGroupExpenses(id);
            setExpenses(expenseData);
            const balanceData = await getBalances(id);
            setBalances(balanceData);
        }
        catch(error){
            console.log(error.response?.data || error.message);
        }
            
    };


    useEffect(() => {
        fetchData();
    }, [id]);


    return (
        <div className="group-details">

            <div className="hero-card">
                <button className="back-btn" onClick={() => navigate("/dashboard")}>
                    ← Back
                </button>

                <h1 className="group-title">📁 {group ? group.name : "Loading..."}</h1>
                
                <p className="group-subtitle">Manage expenses with your friends</p>

            </div>
            


            <div className="summary-cards">

                <div className="summary-card">
                    <div className="summary-icon">👥</div>
                    <h3>Members</h3>
                    <h1>{members.length}</h1>
                </div>

                <div className="summary-card">
                    <div className="summary-icon">💸</div>
                    <h3>Expenses</h3>
                    <h1>{expenses.length}</h1>
                </div>

                <div className="summary-card">
                    <div className="summary-icon">⚖️</div>
                    <h3>Balances</h3>
                    <h1>{balances.length}</h1>
                </div>

            </div>




            <div className="section-card">
                
                <AddMemberForm
                    groupId={id}
                    onMemberAdded={fetchData}
                />

            </div>


            <div className="section-card">
               
                <AddExpenseForm
                    members={members}
                    groupId={id}
                    onExpenseAdded={fetchData}
                />

            </div>



            <div className="section-card">
                
                <MembersList
                    members={members}
                />
            </div>


            <div className="section-card">
               
                <ExpensesList
                    expenses={expenses}
                />
            </div>


            <div className="section-card">
                
                <BalanceList
                    balances={balances}
                />

            </div>


        </div>
    );
}

export default GroupDetails;