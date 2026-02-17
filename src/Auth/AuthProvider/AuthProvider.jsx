import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { auth } from '../../Firebase/firebase.init';
import { GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();


    const signInWithGoogle = ()=>{
        setLoading(true)
    return signInWithPopup(auth, provider)
    }

    const logOut = ()=>{
        setLoading(true)
    return signOut(auth).then(()=>{
            console.log('user logged out')
            setUser(null)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
}

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (current)=>{
            setUser(current)
            setLoading(false)
        })

        return ()=> unSubscribe();
    },[])


    const AuthData = {
        user,
        setUser,
        loading,
        logOut,
        resetPassword,
        signInWithGoogle
    }


    return (
    <AuthContext value={AuthData}>{children}</AuthContext>
    );
};

export default AuthProvider;