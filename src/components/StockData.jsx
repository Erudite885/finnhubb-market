import React, { useState, useEffect,} from 'react'
import finnhub from "../apis/finnhub";

const StockData = ({symbol}) => {
    const [stockData, setStockData] = useState
    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await finnhub.get('/stock/profile2', {
                    params: {
                        symbol
                    }
                })
                if (isMounted) {
                    setStockData(response.data)
                }
            } catch (err) {}
        }
        fetchData()
    }, [symbol])

    return (
      <div>
        {stockData && (
          <div className="row border bg-white rounded shadow-sm p-4 mt-5">
            <div className="col">
              <div>
                <span className="fw-bold">name:</span>
                {stockData.name}
              </div>
              <div>
                <span className="fw-bold">country:</span>
                {stockData.country}
              </div>
              <div>
                <span className="fw-bold">ticker:</span>
                {stockData.ticker}
              </div>
            </div>
            <div className="col">
              <div>
                <span className="fw-bold">Exchange:</span>
                {stockData.exchange}
              </div>
              <div>
                <span className="fw-bold">Industry:</span>
                {stockData.finnhubIndustry}
              </div>
              <div>
                <span className="fw-bold">IPO:</span>
                {stockData.ipo}
              </div>
            </div>
            <div className="col">
              <div>
                <span className="fw-bold">MarketCap:</span>
                {stockData.marketCapitalization}
              </div>
              <div>
                <span className="fw-bold">Shares Outstanding:</span>
                {stockData.shareOutstanding}
              </div>
              <div>
                <span className="fw-bold">url:</span>
                <a href={stockData.weburl}>{stockData.name}</a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default StockData