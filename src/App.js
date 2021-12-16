import { useEffect, useState, useCallback } from 'react';
import github from './db';
import query from './query';
import RepoInfo from './RepoInfo';
import SearchField from './SearchField';
import Pagination from './Pagination';

function App() {
  let [ userName, setUserName ] = useState("");
  let [ repoList, setRepoList ] = useState(null);
  let [ queryString, setQueryString ] = useState("java");
  let [ paginationKeyword, setPaginationKeyword ] = useState('first'); // or last
  let [ pageCount, setPageCount ] = useState(10); // 10 result per page default
  let [ totalCount, setTotalCount ] = useState(0);
  let [ paginationString, setPaginationString ] = useState('');
  let [ pageInfo, setPageInfo ] = useState({
    startCursor: null,
    endCursor: null,
    hasNextPage: true,
    hasPreviousPage: false,
  })

  const fetchData = useCallback(() => { 
    const queryText = JSON.stringify(query(pageCount, queryString, paginationKeyword, paginationString))
    fetch(github.baseURL, {
      headers: github.headers,
      method: 'POST',
      body: queryText,
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.data) {
        const {viewer, repos } = data.data;
        setUserName(viewer.name);
        setRepoList(repos.edges);
        setTotalCount(repos.repositoryCount)
        setPageInfo(repos.pageInfo)
      }
    })
    .catch(err => console.error(err));
  }, [pageCount, queryString, paginationKeyword, paginationString]);


  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Repos - {userName}
      </h1>
      <Pagination
        pageInfo={pageInfo}
        onPaginate={(firstOrLastKey, completeCursorPosition) => {
          setPaginationKeyword(firstOrLastKey);
          setPaginationString(completeCursorPosition);
        }}
      />
      <SearchField
        onQueryChange={str => setQueryString(str)}
        onCountChange={count => setPageCount(count)}
        queryValue={queryString}
        totalCount={totalCount}
        pageCount={pageCount}
        paginationKeyword={paginationKeyword}
      />
      {
        repoList && (
          <ul className="list-group list-group-flush">
            {
              repoList.map((repo) => (
                <RepoInfo repo={repo.node} key={repo.node.id}/>
              ))
            }

          </ul>
        )
      }
    </div>
  );
}

export default App;
