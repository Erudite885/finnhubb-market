// install apexchart react-apexcharts then
// import Chart from 'react-apexcharts';
import React, {useState} from 'react'

const StockChart = ({chartData}) => {

    const [dateFormat, setDateFormat] = useState('24h')
    const {day, week, year} = chartData

     const determineTimeFormat = () => {
        switch (dateFormat) {
          case "24h":
            return day;
          case "7d":
            return week;
          case "1y":
            return year;
            default:
                return day
        }
    }

    const color = determineTimeFormat()[determineTimeFormat().length - 1].y - determineTimeFormat()[0].y ? 'limegreen' : 'crimson';

     const options = {
        colors:[color],
        title: {
            text: symbol,
            align: 'center',
            style: {
                fontSize: '24px'
            }
        },
        chart: {
            id: 'stock data',
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false,
            }
        },
        tooltip: {
            x: {
                format: 'MM dd HH:MM'
            }
        }
    }

    const series = [{
        name: symbol,
        data: determineTimeFormat(),
    }]

    const renderBtnSelect = () => {
        const classes = 'btn m1'
        if (button === dateFormat){
            return classes + 'btn-primary'
        } else {
            return classes + 'btn-outline-primary'
        }
    }

    return (
      <div className="bg-sky-400 mt-5 p-5 shadow">
        <Chart options={options} series={series} type="area" width="100%" />
        <div>
          <button className={renderBtnSelect('24h')} onClick={() => setDateFormat('24h')}>24h</button>
          <button className={renderBtnSelect('7d')} onClick={() => setDateFormat('7d')}>7d</button> 
          <button className={renderBtnSelect('1y')} onClick={() => setDateFormat('1y')}>1y</button> 
        </div>
      </div>
    );
}

export default StockChart