import { useEffect, useState } from "react";
import { getGroups, createGroup } from "../services/groupService";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchGroups = async () => {

            try {

                const data = await getGroups();
                setGroups(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchGroups();

    }, []);

    const handleCreateGroup = async () => {

        if (!groupName.trim()) {
            alert("Please enter a group name");
            return;
        }

        try {

            const newGroup = await createGroup(groupName);

            setGroups((prevGroups) => [...prevGroups, newGroup]);

            setGroupName("");

            setShowForm(false);

        } catch (error) {

            console.log(error.response?.data);

        }

    };

    // Loading Screen
    if (loading) {

        return (

            <div className="dashboard">

                <h1
                    style={{
                        textAlign: "center",
                        marginTop: "250px"
                    }}
                >
                    Loading...
                </h1>

            </div>

        );

    }

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <span className="logo-text">
                    SPLITEASE
                </span>

                <h1>
                    👋 Welcome Back, {user?.name}
                </h1>

                <p>
                    Split your expenses effortlessly with friends and family.
                </p>

                <button
                    className="new-group-btn"
                    onClick={() => setShowForm(true)}
                >
                    + Create New Group
                </button>

            </div>

            {showForm && (

                <div className="create-group">

                    <input
                        type="text"
                        placeholder="Enter Group Name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />

                    <button onClick={handleCreateGroup}>
                        Create
                    </button>

                </div>

            )}

            <h2 className="section-title">
                📂 Your Groups
            </h2>

            <div className="groups-container">

                {groups.length === 0 ? (

                    <div className="empty-card">

                        <h2>📂 No Groups Yet</h2>

                        <p>
                            Create your first group and start splitting expenses!
                        </p>

                        <button
                            className="new-group-btn"
                            onClick={() => setShowForm(true)}
                        >
                            + Create Group
                        </button>

                    </div>

                ) : (

                    groups.map((group) => (

                        <div
                            className="group-card"
                            key={group.id}
                            onClick={() => navigate(`/groups/${group.id}`)}
                        >

                            <h2>
                                📁 {group.name}
                            </h2>

                            <p>
                                👤 Created by You
                            </p>

                            <div className="group-footer">

                                <span className="group-date">
                                    📅 Active
                                </span>

                                <span className="open-group">
                                    Open →
                                </span>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}

export default Dashboard;