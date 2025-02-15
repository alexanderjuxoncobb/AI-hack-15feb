import { useState } from 'react';
import { analyzeImageWithGemini } from '../utils/gemini';

const ESGInformation = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    
    if (!file) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await analyzeImageWithGemini(file);
      setResult(response);
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*"
        onChange={handleImageSubmit}
      />
      
      {loading && <p>Analyzing image...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {result && (
        <div>
          <h3>Analysis Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default ESGInformation; 