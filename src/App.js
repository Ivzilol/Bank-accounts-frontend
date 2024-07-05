import './App.css';
import {Route, Routes} from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import {useEffect, useState} from "react";
import {useUser} from "./userPrivider/UserProvider";

import PrivateRoute from "./priviteRouts/PrivateRoute";
import Homepage from "./components/Homepage/Homepage";
import {jwtDecode} from "jwt-decode";
import CreateBankAccount from "./components/BankAccounts/CreateBankAccount";
import EditBankAccount from "./components/BankAccounts/EditBankAccount";
import Transfers from "./components/Transfers/Transfers";
import TransferDetails from "./components/Transfers/TransferDetails";

function App() {

    const user = useUser();
    const [roles, setRoles] = useState(getRolesFromJWT());


    useEffect(() => {
        setRoles(getRolesFromJWT())
    }, [user.jwt])

    function getRolesFromJWT() {
        if (user.jwt) {
            const decodeJwt = jwtDecode(user.jwt)
            return decodeJwt.authorities;
        }
        return [];
    }

    return (
        <Routes>
            <Route path="/"
                   element={
                       roles.find((role) => role === 'user') ? (
                           <PrivateRoute>
                               <Homepage/>
                           </PrivateRoute>
                       ) : (
                           <PrivateRoute>
                               <Login/>
                           </PrivateRoute>
                       )
                   }/>
            <Route path="/create"
                   element={
                       roles.find((role) => role === 'user') ? (
                           <PrivateRoute>
                               <CreateBankAccount/>
                           </PrivateRoute>
                       ) : (
                           <PrivateRoute>
                               <Login/>
                           </PrivateRoute>
                       )
                   }/>
            }
            <Route path="/edit/:accountId"
                   element={
                       roles.find((role) => role === 'user') ? (
                           <PrivateRoute>
                               <EditBankAccount/>
                           </PrivateRoute>
                       ) : (
                           <PrivateRoute>
                               <Login/>
                           </PrivateRoute>
                       )
                   }

            />
            <Route path="/transfers/:accountId"
                   element={
                       roles.find((role) => role === 'user') ? (
                           <PrivateRoute>
                               <Transfers/>
                           </PrivateRoute>
                       ) : (
                           <PrivateRoute>
                               <Login/>
                           </PrivateRoute>
                       )
                   }
            />
            <Route path="/transfers/details/:transferId"
                   element={
                       roles.find((role) => role === 'user') ? (
                           <PrivateRoute>
                               <TransferDetails/>
                           </PrivateRoute>
                       ) : (
                           <PrivateRoute>
                               <Login/>
                           </PrivateRoute>
                       )
                   }

            />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    );
}

export default App;
