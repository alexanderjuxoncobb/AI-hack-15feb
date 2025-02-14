import { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Paper, 
  Box,
  Typography 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

function SearchPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    linkedin: ''
  });

  const navigate = useNavigate();
  const { addToHistory } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    addToHistory(formData);
    console.log('Form submitted:', formData);
    navigate('/results');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4, flex: 1 }}>
      <Paper 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
          },
        }}
      >
        <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
          Search for People
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="LinkedIn URL"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <Button 
              variant="contained" 
              type="submit"
              size="large"
              startIcon={<SearchIcon />}
              sx={{ mt: 2 }}
            >
              Search
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default SearchPage;
