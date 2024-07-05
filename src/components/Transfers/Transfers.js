import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ajax from "../../service/FetchService";
import baseURL from "../BaseUrl/baseURL";
import {useUser} from "../../userPrivider/UserProvider";
import './Transfers.css'
import Navbar from "../Navbar/Navbar";

const Transfers = () => {

    const user = useUser();
    const navigate = useNavigate()
    const {accountId} = useParams();
    const [transfers, setTransfer] = useState([]);

    useEffect(() => {
        ajax(`${baseURL}api/transfer/${accountId}`, "GET", user.jwt)
            .then((response) => {
                setTransfer(response)
            })
    }, [])


    return (
        <div>
            <Navbar/>
            <div className="transfers-list">
                <h2>Transfers List</h2>
                {transfers.map((transfer) => (
                    <div key={transfer.id} className="transfer-item">
                        <div className="transfer-detail">
                            <span className="label">Transfer Type:</span>
                            <span className="value">{transfer.transferType}</span>
                        </div>
                        <div className="transfer-detail">
                            <span className="label">Amount:</span>
                            <span className="value">{transfer.amount.toFixed(2)}</span>
                        </div>
                        <button id="submit"
                                type="submit"
                                onClick={() => navigate(`/transfers/details/${transfer.id}`)}
                        >Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Transfers;