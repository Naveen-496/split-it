

export const useCurrentUser = () => {
    const currentUserLocal = localStorage.getItem("current_user");
    const currentUser = JSON.parse(currentUserLocal || "{}");
    return currentUser;
}

export const useUsers = () => {
    const localUsers = localStorage.getItem("app_users");
    const data = JSON.parse(localUsers || "[]");
    return data;
}