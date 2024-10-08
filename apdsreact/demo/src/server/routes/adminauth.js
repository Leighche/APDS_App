import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Code Attribution:
// Authour:guriasoft
// Link: https://guriasoft.com/server-side/node-js/ci-cd

const mockAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // Simulate async operation
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    },
};

const AdminAuth = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(mockAuth.isAuthenticated);

    useEffect(() => {
        // Update the authentication state if needed
        setIsAuthenticated(mockAuth.isAuthenticated);
    }, []);

    const handleLogin = () => {
        mockAuth.authenticate(() => {
            setIsAuthenticated(true);
        });
    };

    const handleLogout = () => {
        mockAuth.signout(() => {
            setIsAuthenticated(false);
        });
    };

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} onLogout={handleLogout} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

export default AdminAuth;
