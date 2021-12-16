import React from 'react';

export default function({
  pageInfo: {
    startCursor: start,
    endCursor: end,
    hasNextPage: next,
    hasPreviousPage: previous
  },
  onPaginate,
}) {
  return (
    <div className="d-flex justify-content-center my-2">
      {previous && (
        <button
          className="btn mx-1 btn-sm btn-primary bi bi-arrow-left"
          onClick={() => onPaginate('last', 'before: "' + start + '"')}
        />
      )}
      {next && (
        <button
          className="btn mx-1 btn-sm btn-primary bi bi-arrow-right"
          onClick={() =>  onPaginate('first', 'after: "' + end + '"')}
        />
      )}
    </div>
  );
};