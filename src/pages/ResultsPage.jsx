import { useState } from 'react';
import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearch } from '../context/SearchContext';

function ResultsPage() {
  const { searchHistory } = useSearch();

  return (
    <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
          Search History
        </Typography>
        {searchHistory.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No searches yet
          </Typography>
        ) : (
          searchHistory.map((search) => (
            <Accordion 
              key={search.id} 
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.01)',
                },
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '&.Mui-expanded': {
                    backgroundColor: 'rgba(0,0,0,0.02)',
                  },
                }}
              >
                <Typography>{search.fullName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography>Date of Birth: {search.dateOfBirth}</Typography>
                  <Typography>LinkedIn: {search.linkedin}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Searched on: {new Date(search.timestamp).toLocaleString()}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Paper>
    </Container>
  );
}

export default ResultsPage; 