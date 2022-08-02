import { createContext, useState } from 'react';

export const AuthContext = createContext({});

let userDefault = {
	username: '',
	accessToken: '',
	_id: ''
}

function AuthProvider ({
    children,
}) {
    const [auth, setAuth] = useState(userDefault);

    const userLogin = (authData) => {
        
        setAuth(authData);

    };

    const userLogout = () => {
        setAuth(userDefault);
    };

    return (
        <AuthContext.Provider value={{
            user: auth,
            userLogin,
            userLogout,
            isAuthenticated: auth.accessToken.length > 0
        }}>
            <h1>{auth.username}</h1>
            {children}
        </AuthContext.Provider>  
    );
};

export default AuthProvider;