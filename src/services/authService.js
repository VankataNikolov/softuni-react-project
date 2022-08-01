const baseUrl = 'http://localhost:5000/users';

export const register = async (username, password) => {
    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: setBody({username, password})
        });

        return response;
    } catch (error) {
        console.log(error);
    }
};

export const login = async (username, password) => {
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: setBody({username, password})
        });

        return response;
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        });

        return response;
    } catch (error) {
        console.log(error);
    }
};

function setBody(data) {
    return JSON.stringify(data);
}

