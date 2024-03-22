const key = 'saved-token'

export const getTokenFromLocalStorage = () => {
    return JSON.parse(window.localStorage.getItem(key));
}


export const saveTokenToLocalStorage = (token) => {
    window.localStorage.setItem(key, JSON.stringify(token))
}

export const removeTokenFromLocalStorage = () => {
    window.localStorage.removeItem(key);
}