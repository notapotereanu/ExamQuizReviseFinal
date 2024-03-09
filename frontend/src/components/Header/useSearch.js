import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        const response = await axios.get(`http://localhost:5000/api/search`, {
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

  const navigate = useNavigate();


  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`); // Navigate to quiz page by ID
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`); // Navigate to user page by ID
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
