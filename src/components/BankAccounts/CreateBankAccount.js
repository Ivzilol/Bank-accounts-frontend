import {useState} from "react";
import ajax from "../../service/FetchService";
import baseURL from "../BaseUrl/baseURL";
import {useUser} from "../../userPrivider/UserProvider";
import {useNavigate} from "react-router-dom";
import './CreateBankAccount.css'
import Navbar from "../Navbar/Navbar";

const CreateBankAccount = () => {

    const user = useUser();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        iban: '',
        availableAmount: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const createAccount = (e) => {
        e.preventDefault()
        ajax(`${baseURL}api/bank-accounts/create`, "POST", user.jwt, formData)
            .then((response) => {
                if (response.custom !== undefined) {
                    navigate("/")
                } else {
                    setBankAccountError(response);
                    setBankError(true);
                }
            })
    }

    const [bankError, setBankError] = useState(false);
    const [bankAccountError, setBankAccountError] = useState({
        errorName: '',
        errorIban: ''
    })

    return (
        <div>
            <Navbar/>
            <div className="create-account-container">
                <h2>Create Bank Account</h2>
                <section className="create-account-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {bankError && bankAccountError.errorName &&
                            <span id="validate-name"
                                  className="validate-name"
                            >{bankAccountError.errorName}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="iban">IBAN</label>
                        <input
                            type="text"
                            id="iban"
                            name="iban"
                            value={formData.iban}
                            onChange={handleChange}
                            required
                        />
                        {bankError && bankAccountError.errorIban &&
                            <span id="validate-name"
                                  className="validate-name"
                            >{bankAccountError.errorIban}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableAmount">Available Amount</label>
                        <input
                            type="number"
                            id="availableAmount"
                            name="availableAmount"
                            value={formData.availableAmount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit"
                            className="submit-button"
                            onClick={(e) => createAccount(e)}
                    >Create Account
                    </button>
                </section>
            </div>
        </div>
    )

}

export default CreateBankAccount;