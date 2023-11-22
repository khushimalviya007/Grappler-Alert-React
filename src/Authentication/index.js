

// isLoggedIn =>

export const IsLoggedIn = () => {
    let data = localStorage.getItem("data");
    if(data != null) {
        return true;
    }
    else {
        return false;
    }
};

// doLogin => data => set to localstorage

export const DoLogin = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
}

// doLogout => remove from localstorage

export const DoLogout = (next) => {
    localStorage.removeItem("data");
    next();
}

// Get currentUser
export const getCurrentUserDetails = () => {
    if(IsLoggedIn) {
        return JSON.parse(localStorage.getItem("data"));
    }
    else {
        return false;
    }
}