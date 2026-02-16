import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { auth } from '../../Firebase/firebase.init';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const logOut = ()=>{
        signOut(auth).then(()=>{
            console.log('user logged out')
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (current)=>{
            setUser(current)
            setLoading(false)
        })

        return unSubscribe();
    },[])


    const AuthData = {
        user,
        loading,
        logOut
    }


    return (
    <AuthContext value={AuthData}>{children}</AuthContext>
    );
};

export default AuthProvider;