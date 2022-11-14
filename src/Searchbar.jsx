const Searchbar = ({inputValue, setInputValue}) => {
    return (
      <div className="searchbar" >
        <input type="text" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
      </div>     
    );
}

export default Searchbar;