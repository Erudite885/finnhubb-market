import React, { useState, useEffect, useContext } from 'react'
import finnhub from '../apis/finnhub'
import { context } from "../store/context"; 

const AutoComplete = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const {addStock} = useContext(context)

  const renderDrp = () => {
    const dropdown = search ? 'show' : null
    return (
      <ul className={`dropdown-menu ${dropdown} h-[500px] overflowY-scroll overflowX-[hidden] pointer`}>
        {results.map((result => {
          return (
            <li key={result.symbol} onClick={() => {
              addStock(result.symbol)
              setSearch('')
            }}>{result.description} ({result.symbol})</li>
          )
        }))}
      </ul>
    )
  }


  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const res = await finnhub.get('/search', {
          params: {
            q: search
          }
        })
        console.log(res)
        if (isMounted){
          setResults(res.data.result)
        }
      } catch (error) {}
    }
    if (search.length > 0) {
      fetchData()
    } else {
      setResults([])
    }
    return () => {isMounted = false}
  }, [search])

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          type="text"
          className="rgba(145, 158, 171, 0.04) form-control"
          id="search"
          placeholder="search"
          autocomplete="off"
          value={search}
          onChange={(event)=>{setSearch(event.target.value)}}
        ></input>
        <label htmlFor="search" className="">
          Search
        </label>
        {renderDrp()}
      </div>
    </div>
  );
}

export default AutoComplete