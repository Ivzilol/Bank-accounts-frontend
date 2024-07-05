import {useEffect, useState} from "react";
import './BankAccounts.css';
import {useUser} from "../../userPrivider/UserProvider";
import ajax from "../../service/FetchService";
import baseURL from "../BaseUrl/baseURL";
import {useNavigate} from "react-router-dom";

const BankAccounts = () => {

    const user = useUser();
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        ajax(`${baseURL}api/bank-accounts`, "GET", user.jwt)
            .then((response) => {
                setAccounts(response);
            })
    }, [user.jwt])

    const changeStatus = (id) => {
        setAccounts((prevAccounts) =>
            prevAccounts.map((account) =>
                account.id === id ? { ...account, status: account.status === 'Active' ? 'Frozen' : 'Active' } : account
            )
        );

        const requestBody = {
            id: id
        }

        ajax(`${baseURL}api/bank-accounts/status`, "POST", user.jwt, requestBody)
            .then(() => {

            })
    };

    return (
        <div className="accounts-container">
            <h2>Your Bank Accounts</h2>
            {accounts.length > 0 ? (
                <ul className="accounts-list">
                    {accounts.map(account => (
                        <li key={account.id} className="account-item">
                            <span className="account-name">{account.name}</span>
                            <span className="account-iban">{account.iban}</span>
                            <span className="account-iban">{account.availableAmount.toFixed(2)} лв.</span>
                            <button
                                className="edit-button"
                                onClick={() => changeStatus(account.id)}
                            >
                                {account.status === 'Active' ? 'Active' : 'Frozen'}
                            </button>
                            <button
                                id="submit"
                                type="button"
                                onClick={() => {
                                   navigate(`/edit/${account.id}`)
                                }}
                                className="edit-button">Edit</button>
                            <button
                                id="submit"
                                type="button"
                                onClick={() => {
                                    navigate(`/transfers/${account.id}`)
                                }}
                                className="edit-button">Transfers</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-accounts">No accounts found</p>
            )}
        </div>
    );
}

export default BankAccounts;