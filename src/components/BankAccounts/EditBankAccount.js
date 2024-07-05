import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ajax from "../../service/FetchService";
import baseURL from "../BaseUrl/baseURL";
import {useUser} from "../../userPrivider/UserProvider";
import Navbar from "../Navbar/Navbar";


const EditBankAccount = () => {

    const user = useUser();
    const {accountId} = useParams();
    const navigate = useNavigate()
    const [account, setAccount] = useState({
        name: '',
        iban: ''
    });

    useEffect(() => {
        ajax(`${baseURL}api/bank-accounts/edit/${accountId}`, "GET", user.jwt)
            .then((response) => {
                setAccount(response)
            })
    }, [accountId, user.jwt])

    function updateAccount(prop, value) {
        const newAccount = {...account}
        newAccount[prop] = value;
        setAccount(newAccount)
    }

    function editAccountBody() {
        const formData = new FormData();
        const dto = {
            name: account.name,
            iban: account.iban
        }
        formData.append("dto",
            new Blob([JSON.stringify(dto)], {
                type: "application/json",
            })
        );
        return formData;
    }

    function persist() {
        const formData = editAccountBody();
        fetch(`${baseURL}api/bank-accounts/edit/${accountId}`, {
            method: "PATCH",
            body: formData
        })
            .then(response => {
                if (response.status === 200) {
                    navigate("/")
                } else {
                    alert(response.custom)
                }
            })
    }



    function deleteAccount() {
        ajax(`${baseURL}api/bank-accounts/delete/${accountId}`, "DELETE", user.jwt)
            .then((response) => {
                if (response.status === 200) {
                    navigate("/")
                } else {
                    alert(response.custom)
                }
            })
    }



    return (
        <div>
            <Navbar/>
            <div className="edit-account-container">
                <h2>Edit Bank Account</h2>
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={(e) => updateAccount("name", e.target.value)}
                            type="text"
                            id="name"
                            name="name"
                            value={account.name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="iban">IBAN</label>
                        <input
                            onChange={(e) => updateAccount("iban", e.target.value)}
                            type="text"
                            id="iban"
                            name="iban"
                            value={account.iban}
                        />
                    </div>
                    <button
                        type="submit"
                        className="submit-button"
                        onClick={() => persist()}
                    >Save
                    </button>
                    <button
                        type="submit"
                        className="submit-button"
                        onClick={() => deleteAccount()}
                    >Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditBankAccount;