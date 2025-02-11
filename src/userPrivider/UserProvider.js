import React, {createContext, useContext} from "react";
import {useLocalState} from "../util/useLocalState";

const UserContext = createContext();


const UserProvider = ({children}) => {
    const [jwt, setJwt] = useLocalState(null, "jwt");
    const value = {jwt, setJwt};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {

    }
    return context;
}


export {UserProvider, useUser} ;