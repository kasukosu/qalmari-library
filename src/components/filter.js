const Filter = ({newSearch, searchHandler, setSortMethod}) => {
  return (
      <div className="filter">
          <h2 htmlFor="filter">Filter Books</h2>
          <input type="text" placeholder="Search..." name="filter" onChange={searchHandler} value={newSearch} />
          <div>
            <button onClick={() => setSortMethod(0)}>Sort by asc</button>
            <button onClick={() => setSortMethod(1)}>Sort by desc</button>
          </div>
      </div>
  );
}

export default Filter;