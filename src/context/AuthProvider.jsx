import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/Firebase.config';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
   

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const sigInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }


    const googleSigneIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    const updateUser = (UpdatedData) => {
        return updateProfile(auth.currentUser, UpdatedData);
    }



      useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })

        return () => {
            unSubscribe();
        }
    }, [])



    const userInfo = {
        user,
        loading,
        createUser,
        sigInUser,
        signOutUser,
        googleSigneIn,
        updateUser,
        setUser,
        setLoading,

    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;