import {useUser} from "../../userPrivider/UserProvider";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './TransferDetails.css'
import ajax from "../../service/FetchService";
import baseURL from "../BaseUrl/baseURL";
import './TransferDetails.css'
import Navbar from "../Navbar/Navbar";

const TransferDetails = () => {

    const user = useUser()
    const {transferId} = useParams()
    const [transfer, setTransfer] = useState(null);

    useEffect(() => {
        ajax(`${baseURL}api/transfer/details/${transferId}`, "GET", user.jwt)
            .then(response => {
                setTransfer(response)
            })
    }, [transferId, user.jwt])

    if (!transfer) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar/>
            <div className="transfer-detail">
                <section>
                    <div className="detail-item">
                        <h5 className="label">Transfer Type: </h5>
                        <p className="value">{transfer.transferType}</p>
                    </div>
                    <div className="detail-item">
                        <h5 className="label">Amount: </h5>
                        <p className="value">{transfer.amount.toFixed(2)}</p>
                    </div>
                    <div className="detail-item">
                        <h5 className="label">Created On: </h5>
                        <p className="value">{transfer.createdOn}</p>
                    </div>
                    <div className="detail-item">
                        <h5 className="label">Created On Time: </h5>
                        <p className="value">{transfer.time}</p>
                    </div>
                </section>
            </div>
        </div>
    )

}

export default TransferDetails;