import React from 'react';
import {Line} from 'react-chartjs-2';

class ChartLine extends React.Component {
    render() {
      const {labels, dataLine, name, lineTitle} = this.props;
      // const {name} = this.props;

      const data = {
        labels: labels,
        datasets: [
          {
            label: lineTitle,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,0.9)', //Linea
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            pointHitRadius: 5,
            data: dataLine
          }
        ]
      };
        return (
          <div>
            <h2>{name}</h2>
            <Line data={data} />
          </div>
        );
    }
}

export default ChartLine;