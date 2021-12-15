import { useEffect, useState, useCallback } from 'react';
import github from './db';
import { githubQuery } from './query';

function App() {
  let [ userName, setUserName ] = useState("");
  let [ repoList, setRepoList ] = useState(null);

  const fetchData = useCallback(() => { 
    fetch(github.baseURL, {
      headers: github.headers,
      method: 'POST',
      body: JSON.stringify(githubQuery),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data && data.data) {
        const viewer = data.data.viewer;
        console.log('vewerw', viewer)
        setUserName(viewer.name);
        setRepoList(viewer.repositories.nodes);
      }
    })
    .catch(err => console.log(err));
  }, []);


  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log('repos', repoList)
  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos - {userName}
        {
          repoList && (
            <ul className="list-group list-group-flush">
              {
                repoList.map((repo) => (
                  <li className="list-group-item" key={repo.id}>
                    <a className="h5 mb-0 text-decoration-none">
                    {repo.name}
                    </a>
                    <p className="small">{repo.description}</p>
                  </li>
                ))
              }

            </ul>
          )
        }
      </h1>
    </div>
  );
}

export default App;
