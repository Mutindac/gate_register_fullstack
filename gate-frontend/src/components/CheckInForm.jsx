import { useState } from 'react';
import { api } from '../api/api';

function CheckInForm({ refresh }) {
    const [form, setForm] = useState({
        name: '',
        id_number: '',
        destination: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await api.post('check-in/', form);
        if (res.error) {
            alert(res.error);
        } else {
            alert('Check-in successful!');
            setForm({ name: '', id_number: '', destination: '' });
            refresh();
        }
    };

     return (
    <div>
      <h2>Check In</h2>

      <input
        required
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        required
        type="number"
        placeholder="ID Number"
        value={form.id_number}
        onChange={(e) =>
          setForm({ ...form, id_number: e.target.value })
        }
      />

      <input
        required
        placeholder="Destination"
        value={form.destination}
        onChange={(e) =>
          setForm({ ...form, destination: e.target.value })
        }
      />

      <button onClick={handleSubmit}>Check In</button>
    </div>
  );
}

export default CheckInForm;