import { useState, useEffect } from "react";
import firebase from '../../firebase';

function useAuth() {
    const [ authUser, setAuthUser ] = useState(null);

    useEffect(() => {
        const { auth } = firebase;
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => unsubscribe();
    }, []);
    
    return authUser;
}

export default useAuth;
