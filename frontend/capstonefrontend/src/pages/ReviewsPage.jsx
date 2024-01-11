import React, { useState, useContext } from 'react';
import { Outlet, useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import CustomCard from '../components/CustomCard';
import { TextField, Button, Box, Grid } from '@mui/material';
import { SearchContext } from '../context/SearchContext';
import { useUserContext } from '../context/UserContext';

export default function ReviewsPage() {
  const { users, handleUpdateUsers } = useUserContext();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    // Logic to post the new review to the backend
    try {
      const response = await fetch('http://localhost:8080/api/reviews/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          comment: body,
          // Add any other necessary fields
        }),
      });

      if (response.ok) {
        // Handle successful review creation, maybe update the reviews list
        // You may fetch the updated reviews and update the state here
      } else {
        // Handle error
        console.error('Failed to create review');
      }
    } catch (error) {
      console.error('Error creating review:', error.message);
    }

    // Clear the form fields after posting
    setTitle('');
    setBody('');
  };

  return (
    <div className="Reviews">
      {/* New Review Form */}
      <Box component="form" onSubmit={handleReviewSubmit}>
        <TextField
          id="new-review-title"
          label="Title"
          variant="outlined"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="new-review-text"
          label="Review"
          variant="outlined"
          fullWidth
          multiline
          onChange={(e) => setBody(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '10px' }}
        >
          Post Review
        </Button>
      </Box>

      <Outlet />
    </div>
  );
}


