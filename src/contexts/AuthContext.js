import { createContext, useState } from 'react';

export const AuthContext = createContext({});

let userDefault = {
	username: '',
	accessToken: '',
	userId: ''
}

function AuthProvider ({
    children,
}) {
    const [auth, setAuth] = useState(userDefault);

    const userLogin = (authData) => {
        setAuth({
            username: authData.username,
            accessToken: authData.accessToken,
            userId: authData._id
        });
    };

    const userLogout = () => {
        setAuth(userDefault);
    };

    return (
        <AuthContext.Provider value={{
            user: auth,
            userLogin,
            userLogout,
            isAuthenticated: !!auth.accessToken
        }}>
            {children}
        </AuthContext.Provider>  
    );
};

export default AuthProvider;