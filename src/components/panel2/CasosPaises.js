import React from 'react';
import Chart from 'react-google-charts';
import LineWorld from '../../assets/charts/LineWorld';
import Cargando from '../Cargando';

class CasosPaises extends React.Component{
    render(){
        const {cargarDataPaises, country, dataP, cOt, cCt} = this.props;

        return(
            <div className="row panel2__content-main_row">
                <div className="col-4 col-sm-4 panel2__content-main-column">
                    {
                        cargarDataPaises ?
                            <LineWorld 
                                labels={dataP.date}
                                dataLine={dataP.total}
                                name={country}
                                lineTitle="Total casos"
                            />
                        : <Cargando />
                    }
                </div>
                <div className="col-4 col-sm-4 panel2__content-main-column">
                    {
                        cargarDataPaises ?
                            <LineWorld 
                                labels={dataP.date}
                                dataLine={dataP.nuevos}
                                name={country}
                                lineTitle="Nuevos casos"
                            />
                        : <Cargando />
                    }
                </div>
                <div className="col-3 col-sm-3 panel2__content-main-column">
                    {
                        cargarDataPaises ?
                            <Chart
                            width={'100%'}
                            height={''}
                            chartType="PieChart"
                            loader={<div></div>}
                            data={[
                                ['País', 'Total casos'],
                                ['Otros', cOt],
                                [country, cCt],
                            ]}
                            options={{
                                backgroundColor:'rgb(44,62,80)',
                                legend: 'none',
                                pieSliceText: 'label',
                                title: '',
                                pieStartAngle: 100,
                            }}
                            //   rootProps={{ 'data-testid': '4' }}
                            />
                        : <Cargando />
                    }
                </div>
            </div>
        );
    }
}

export default CasosPaises;