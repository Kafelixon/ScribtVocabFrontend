import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Switch, FormControlLabel, Box, Typography, Paper, CircularProgress } from '@mui/material';

interface APIResponse {
  data: any;
}

const App = () => {
  const [textOrFile, setTextOrFile] = useState(true);
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      let res;
      if (textOrFile) {
        res = await axios.get('http://127.0.0.1:8000/translate_text', { params: { text } }); // temporary until we have a backend online 
      } else {
        const formData = new FormData();
        if (file) {
          formData.append('file', file);
        }
        res = await axios.post('http://127.0.0.1:8000/translate_file/', formData); // temporary until we have a backend online
      }
      setResponse(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h1" align="center" gutterBottom>
        Script Vocab
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2 
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={textOrFile}
                onChange={() => setTextOrFile(!textOrFile)}
                name="textOrFileSwitch"
                color="primary"
              />
            }
            label="Switch to file/text"
          />
          {textOrFile ? (
            <TextField
              id="outlined-basic"
              label="Text to translate"
              variant="outlined"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            <Button
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              />
            </Button>
          )}
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </form>
      {response && (
        <Paper elevation={3} style={{ margin: '2rem', padding: '1rem' }}>
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
        </Paper>
      )}
    </>
  );
};

export default App;
