export default (pageCount, queryString, paginationKeyword, paginationString="") => {

  return {
    query: `
    {
      viewer {
        name
      }
      repos: search(query:"${queryString} user:g-dylan-cunningham sort:updated-desc", type: REPOSITORY, ${paginationKeyword}: ${pageCount}, ${paginationString}) {
        edges {
          cursor
          node {
            ... on Repository {
              name
              description
              id
              url
              viewerSubscription
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        repositoryCount
      }
    }
    `,
  };
};


// export const githubQuery = {
//   query: `
//   { 
//     viewer { 
//       name
//       repositories(last: 10) {
//         nodes {
//           name
//           description
//           id
//           url
//         }
//       }
//     }
//   }
//   `,
// };