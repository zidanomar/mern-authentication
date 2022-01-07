import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      navigate('/login');
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };
      try {
        setLoading(true);
        await axios.get('http://localhost:5000/private', config);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    };
    fetchPrivateData();
  }, [navigate]);

  return loading ? (
    <p>loading</p>
  ) : localStorage.getItem('authToken') ? (
    children
  ) : (
    <Navigate to='/login' />
  );
}

export default PrivateRoute;
