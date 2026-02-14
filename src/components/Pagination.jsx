export default function Pagination({
    page,
    totalPages,
    perPage,
    setPage,
    setPerPage,
    start,
    filteredLength,
  }) {
    return (
      <div className="paginationBar">
        <select
          value={perPage}
          onChange={(e) => {
            setPage(1);
            setPerPage(Number(e.target.value));
          }}
        >
          {[5,10,15,20].map(n => (
            <option key={n}>{n}</option>
          ))}
        </select>
  
        <span>
          {start + 1}-{Math.min(start + perPage, filteredLength)} of{" "}
          {filteredLength}
        </span>
  
        <div className="pagerButtons">
          <button disabled={page===1} onClick={()=>setPage(1)}>{"<<"}</button>
          <button disabled={page===1} onClick={()=>setPage(p=>p-1)}>{"<"}</button>
          <button disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>{">"}</button>
          <button disabled={page===totalPages} onClick={()=>setPage(totalPages)}>{">>"}</button>
        </div>
      </div>
    );
  }
  