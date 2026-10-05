import axios from "axios";

const Balupdate = async (points) => {
    try {
        const response = await axios.post("http://localhost:4000/api/update", {
            balance: points,
        }, {
            withCredentials: true
        });
        console.log(response);
    } catch (error) {
        console.error("Error updating balance:", error);
    }
};

export default Balupdate;