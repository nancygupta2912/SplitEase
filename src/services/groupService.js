import api from "./api";

export const getGroups = async () => {
    const response = await api.get("/groups");
    return response.data;
};


export const createGroup = async (name) => {
    const response = await api.post("/groups", {
        name
    });

    return response.data;
};



export const getGroupMembers = async (groupId) => {
    const response = await api.get(`/groups/${groupId}/members`);
    return response.data;
};


export const getGroupExpenses = async (groupId) => {
    const response = await api.get(
        `/groups/${groupId}/expenses`
    );
    return response.data;
};


export const getBalances = async (groupId) => {
    const response = await api.get(
        `/groups/${groupId}/balance`
    );
    return response.data;
};


export const addExpense = async (groupId, expenseData) => {
    const response = await api.post(
        `/groups/${groupId}/expenses`,
        expenseData
    );
    return response.data;

};



export const getGroup = async (groupId) => {
    const response = await api.get(`/groups/${groupId}`);
    return response.data;

};


export const addMember = async (groupId, email) => {
    const response = await api.post(`/groups/${groupId}/members`,{email});
    return response.data;
};

