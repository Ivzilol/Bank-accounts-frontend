import BankAccounts from "./BankAccounts";
import TransferSum from "./TransferSum";
import Navbar from "../Navbar/Navbar";

const Homepage = () => {

    return (
        <div>
            <Navbar/>
            <div>
                <BankAccounts/>
                <TransferSum/>
            </div>
        </div>
    )
}

export default Homepage;