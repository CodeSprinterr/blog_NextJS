// SearchBar.js
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState('');

    const handleSearch = (e) => {
        setInput(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="mb-12 w-full">
            <input
                type="text"
                placeholder="Search..."
                value={input}
                onChange={handleSearch}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchBar;