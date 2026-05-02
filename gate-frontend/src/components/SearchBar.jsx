import { useState } from "react";
import { api } from "../api/api";

function SearchBar({ setVisitors }) {
    const [query, setQuery] = useState("");

    const Search = async () => {
        const data = await api.get(`search/?q=${query}`);
        setVisitors(data);
    };

    return (
    <div>
      <input
        placeholder="Search by name or ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={Search}>Search</button>
    </div>
  );
}

export default SearchBar;