import React, { useState, useEffect, useContext, createContext } from 'react';
import cookie from 'js-cookie';
import firebase from './firebase'
import { createUser } from './db';

const authContext = createContext();

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    // console.log('User ', user);

    const handleUser = async (rawUser) => {
        if (rawUser) {
            const user = await formatUser(rawUser);
            const { token, ...userWithoutToken } = user

            // console.log("rawUser ", rawUser);

            createUser(user.uid, userWithoutToken);
            setUser(user);
            cookie.set('fast-feedback-auth', true, {
                expires: 1
            });
            return user;
        } else {
            setUser(false);
            cookie.remove('fast-feedback-auth');
            return false;
        }
    };

    const signinWithGithub = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((response) => {
                handleUser(response.user);
            });
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                handleUser(false);
            });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => handleUser(user));

        return () => unsubscribe();
    }, []);

    return {
        user,
        signinWithGithub,
        signout,
    };
}

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.Aa,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};