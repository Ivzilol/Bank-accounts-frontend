import {useState} from "react";

import './UserAccounts.css';
import ajax from "../../service/FetchService";
import baseURL from "../BaseUrl/baseURL";
import {useUser} from "../../userPrivider/UserProvider";

const TransferSum = () => {

    const user = useUser();
    const [senderAccount, setSenderAccount] = useState('');
    const [receiverAccount, setReceiverAccount] = useState('');
    const [amount, setAmount] = useState('');

    const handleTransfer = (e) => {

        const requestBody = {
            ibanSend: senderAccount,
            ibanReceives: receiverAccount,
            amount: amount
        }
        ajax(`${baseURL}api/transfer/create`, "POST", user.jwt, requestBody)
            .then((response) => {
                if (response.custom === "Valid transfer") {
                    refreshPage()
                } else {
                    alert("Invalid transfer")
                }
            })
    };

    function refreshPage() {
        window.location.reload();
    }

    return (
        <div className="bank-transfer-container">
            <h2>Банков Трансфер</h2>
            <article >
                <div className="form-group">
                    <label htmlFor="senderAccount">Сметка на подателя</label>
                    <input
                        type="text"
                        id="senderAccount"
                        value={senderAccount}
                        onChange={(e) => setSenderAccount(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="receiverAccount">Сметка на получателя</label>
                    <input
                        type="text"
                        id="receiverAccount"
                        value={receiverAccount}
                        onChange={(e) => setReceiverAccount(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Сума за трансфер</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button type="submit" className="transfer-button"
                    onClick={() => handleTransfer()}
                >Изпрати</button>
            </article>
        </div>
    );
}

export default TransferSum;