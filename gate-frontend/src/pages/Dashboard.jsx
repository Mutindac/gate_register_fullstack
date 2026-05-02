import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import CheckInForm from "../components/CheckInForm";
import ActiveVisitors from "../components/ActiveVisitors";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

function Dashboard() {
    const [visitors, setVisitors] = useState([]);
    const navigate = useNavigate();

    const loadVisitors = async () => {
        try {
            const data = await api.get('active-logs/');

            if (Array.isArray(data)) {
                setVisitors(data);
            } else {
                setVisitors([]);
            }

        } catch (error) {
            console.error("Failed to load visitors:", error);
            setVisitors([]);
        }
    };

    

    useEffect(() => {
        loadVisitors();
        const interval = setInterval(loadVisitors, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center" }}>Gate Register Page</h1>

            <div style={{ marginBottom: "20px" }}>
                <CheckInForm refresh={loadVisitors} />
            </div>

            <div style={{ marginBottom: "20px" }}>
                <SearchBar setVisitors={setVisitors} />
            </div>

            <ActiveVisitors visitors={visitors} refresh={loadVisitors} />

            <Link to="/report">
                <button>View Today’s Report</button>
            </Link>

            
        </div>
    );
}

export default Dashboard;