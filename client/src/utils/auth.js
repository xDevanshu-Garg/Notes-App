export const getUserInfo = () => {

    const data = localStorage.getItem("userInfo");

    return data ? JSON.parse(data) : null;
};


export const logoutUser = () => {

    localStorage.removeItem("userInfo");
};