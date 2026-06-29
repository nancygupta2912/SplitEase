function MembersList({ members }) {

    return (
        <div>
            <h2>👥 Members</h2>
            {
                members.map((member) => (

                    <div className="member-card" key={member.user.id}>

                        <div>

                            <h3>{member.user.name}</h3>
                            <p>{member.user.email}</p>

                        </div>

                        <span
                            className={
                                member.role === "ADMIN"
                                    ? "admin-badge"
                                    : "member-badge"
                            }
                        >

                            {member.role}

                        </span>

                    </div>
            
                ))
            }
        </div>

    );

}

export default MembersList;