export const isLogin = () => {
    const token = localStorage.getItem('loginToken');
    if (token) {
        return true;
    }
    return false;
}