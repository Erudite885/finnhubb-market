import { createContext, useState, useEffect } from 'react'

export const context = createContext()

export const contextProvider = (props) => {
    
    const [watchList, setWatchList] = useState(
      localStorage.getItem("watchList")?.split(",") ||
        [
          'GOOGL', 'MSFT', 'AMZ'
        ]
    );

    useEffect(()=>{
        localStorage.setItem('watchList', watchList)
    },[watchList])

    const addStock = (stock) => {
        if (watchList.indexOf(stock) === -1){
            setWatchList([...watchList, stock])
        }
    }

    const deleteStock = (stock) => {
        setWatchList(watchList.filter((el) => {
            return el !== stock;
        }
        ))
    }

    return <context.Provider value={{ watchList, addStock, deleteStock }}>
        {props.children}
    </context.Provider>
}