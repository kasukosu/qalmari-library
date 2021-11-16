import { faSortAlphaDown, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Filter = ({newSearch, searchHandler, setSortMethod}) => {
  return (
      <div className="filter">
          <h2 htmlFor="filter">Filter Books</h2>
          <input type="text" placeholder="Search..." name="filter" onChange={searchHandler} value={newSearch} />
          <div>
            <div className="flex">
              <div className="flex center actions">
                <button onClick={() => setSortMethod(0)}><FontAwesomeIcon icon={faSortAlphaDown}/></button>
                <button onClick={() => setSortMethod(1)}><FontAwesomeIcon icon={faSortAlphaUp}/></button>
              </div>
            </div>

            {/* Genrejen sorttaus */}
            {/* <div className="flex">
              <p>Sort by genre:</p>
              <div className="flex center">
                <button onClick={() => setSortMethod(2)}><FontAwesomeIcon icon={faSortAlphaDown}/></button>
                <button onClick={() => setSortMethod(3)}><FontAwesomeIcon icon={faSortAlphaUp}/></button>
              </div>
            </div> */}
          </div>
      </div>
  );
}

export default Filter;