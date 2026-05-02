import { useEffect, useState } from "react";
import { api } from "../api/api";

function Report() {
    const [visitors, setVisitors] = useState([]);

    const loadReport = async () => {
        const data = await api.get('today-visitors/');
        setVisitors(data);
    };

    const calculateDuration = (checkIn, checkOut) => {
        const start = new Date(checkIn);
        const end = checkOut ? new Date(checkOut) : new Date();

        const diffMs = end - start;

        const minutes = Math.floor(diffMs / 60000);
        const hours = Math.floor(minutes / 60);

        const remainingMinutes = minutes % 60;

        return `${hours}h ${remainingMinutes}m`;
    };

    useEffect(() => {
        loadReport();
    }, []);

    return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Today’s Report</h1>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Destination</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          {visitors.map((log) => (
            <tr key={log.id}>
              <td>{log.name}</td>
              <td>{log.id_number}</td>
              <td>{log.destination}</td>
              <td>{new Date(log.check_in_time).toLocaleString()}</td>
              <td>
                {log.check_out_time
                  ? new Date(log.check_out_time).toLocaleString()
                  : "Still inside"}
              </td>
              <td>{calculateDuration(log.check_in_time, log.check_out_time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>
        <a href="/" style={{ color: "white", textDecoration: "none" }}>
          Back to Dashboard
        </a>
      </button>
    </div>
  );
}

export default Report;