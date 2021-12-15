import { useEffect } from 'react';
import github from './db';

function App() {
  useEffect(() => {
    const githubQuery = {
      query: `
        { 
          viewer { 
            login
          }
        }
      `,
    };
    fetch(github.baseURL, {
      headers: github.headers,
      method: 'POST',
      body: JSON.stringify(githubQuery),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err));
  }, [])
  return (
    <div className="App">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos
      </h1>
    </div>
  );
}

export default App;
