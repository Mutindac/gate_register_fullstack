import { api } from "../api/api";

function ActiveVisitors({ visitors, refresh }) {
    const handleCheckOut = async (id) => {
        await api.post(`check-out/${id}/`, {});
        refresh();
    };


  return (
    <div>
      <h2>Visitors Currently Inside</h2>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Destination</th>
            <th>Time In</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {visitors.map((v) => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td>{v.id_number}</td>
              <td>{v.destination}</td>
              <td>{new Date(v.check_in_time).toLocaleString()}</td>
              <td>
                <button onClick={() => handleCheckOut(v.id)}>
                  Check Out
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActiveVisitors;