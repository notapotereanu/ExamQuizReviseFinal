import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ users: [], quizzes: [] });
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setSearchResults({ users: [], quizzes: [] });
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/search`, {
          params: {
            query: searchQuery,
          },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults({ users: [], quizzes: [] });
      }
    };

    // Debounce search request
    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchChange = (event, value) => {
    setSearchQuery(value);
  };

  const handleQuizClick = (quizId) => {
    // Logic to handle quiz selection
    console.log(`Quiz selected: ${quizId}`);
    // Implement navigation or further action here
  };

  const handleUserClick = (userId) => {
    // Logic to handle user selection
    console.log(`User selected: ${userId}`);
    // Implement navigation or further action here
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    handleSearchChange,
    handleQuizClick,
    handleUserClick,
    isFocused,
    setIsFocused,
  };
};
