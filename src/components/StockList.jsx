import React, {useState, useEffect, useContext} from 'react'
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import finnhub from '../apis/finnhub';
import { context } from '../store/context'; 

const StockList = () => {
    const [stock, setStock] = useState([])
    const { watchList, deleteStock } = useContext(context)
    const navigate = useNavigate;

    const changeColor = (change) => {
        return change > 0 ? 'success' : 'danger';
    }

    const renderIcon = (change) => {
        return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill/> ;
    }


    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            const responses = []
            try {
                const responses = await Promise.all(
                    watchList.map(
                        stock => {
                            return finnhub.get('/quote', {
                                params: {
                                    symbol: stock
                                }
                            })
                        }
                    )
                )
                console.log(responses)
                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                })
                console.log(data)
                if (isMounted){
                    setStock(data)
                }
            } catch (error) {
                
            }
        }
        fetchData()

        return () => {
            isMounted = false
        }
    }, [watchList])

    const handleStockSelect = (symbol) => {
        navigate(`detail/${symbol}`)
    }
    
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
            {stock.map(stockData => {
                return (
                  <tr className='pointer' key={stockData.symbol} onClick={()=>handleStockSelect(stockData.symbol)}>
                    <th scope="row">{stockData.symbol}</th>
                    <td>{stockData.data.c}</td>
                    <td className={`text-${changeColor(stockData.d)}`}>
                      {stockData.data.d} {renderIcon(stockData.d)}
                    </td>
                    <td className={`text-${changeColor(stockData.dp)}`}>
                      {stockData.data.dp} {renderIcon(stockData.dp)}
                    </td>
                    <td>{stockData.data.h}</td>
                    <td>{stockData.data.l}</td>
                    <td>{stockData.data.o} </td>
                    <td>{stockData.data.pc} <button onClick={(e)=>{
                        e.stopPropagation()
                        deleteStock(stockData.symbol)
                    }} className='btn btn-danger btn-sm ml-3 hover:d-inline-block delete-button'>Delete</button> </td>
                  </tr>
                );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default StockList