import React from 'react';
import Cargando from '../Cargando';
import Chart from 'react-google-charts';
import {
  BarChart as BarChartCh, Bar as BarCh, Brush as BrushCh, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import CasosPaises from './CasosPaises';

import JSON_US from '../../assets/data/covid/us';
import JSON_BZ from '../../assets/data/covid/bz';
import JSON_IN from '../../assets/data/covid/in';
import JSON_RU from '../../assets/data/covid/ru';
import JSON_ZA from '../../assets/data/covid/za';
import JSON_MX from '../../assets/data/covid/mx';
 
class World extends React.Component{
    state={
        dataMapa: [],
        cargarMapa:false,
        dataListaPaises: [],
        cargarListaPaises:false,
        dataJSONListaPaises: [],
        cargarJSONListaPaises: false,
        dataPaises: [],
        cargarDataPaises: false
    };

    async componentDidMount(){
        await this.fetchDataWorld();
        await this.getParseDataWorldJSON();
        await this.getDataPaises();
    }

    fetchDataWorld = async () =>{
        const resp = await fetch('https://api.covid19api.com/summary');
        let data = await resp.json()

        let arrMapa = [['Country', 'Confirmados']];
        let arrListaPaises = [];

        for (let i in data.Countries){
            // if (data.Countries[i].TotalConfirmed >= 100000){
                arrMapa.push([data.Countries[i].Country, data.Countries[i].TotalConfirmed]);
                arrListaPaises.push([
                    data.Countries[i].Country, 
                    data.Countries[i].CountryCode,
                    data.Countries[i].TotalConfirmed,
                    data.Countries[i].TotalDeaths,
                ]);
            // }
        }

        this.setState({
            dataMapa: arrMapa,
            dataListaPaises: arrListaPaises,
            cargarMapa:true,
            cargarListaPaises: true
        });
    }

    getParseDataWorldJSON = async () =>{
        let data = this.state.dataListaPaises;
        let dataJSON = await data.map(e => {
            return {
                name: e[0],
                confirmados: e[2],
                muertes: e[3]
            }
        });

        this.setState({
            dataJSONListaPaises: dataJSON,
            cargarJSONListaPaises: true
        });  
    }

    getDataPaises = async () =>{
        let data = {
            us: {
                date : [],
                nuevos: [],
                total: [],
            },
            bz: {
                date : [],
                nuevos: [],
                total: [],
            },
            in: {
                date : [],
                nuevos: [],
                total: [],
            },
            ru: {
                date : [],
                nuevos: [],
                total: [],
            },
            za: {
                date : [],
                nuevos: [],
                total: [],
            },
            mx: {
                date : [],
                nuevos: [],
                total: [],
            },
        };

        data.us.date = JSON_US.map(e => {return e.Date_reported});
        data.bz.date = JSON_BZ.map(e => {return e.Date_reported});
        data.in.date = JSON_IN.map(e => {return e.Date_reported});
        data.ru.date = JSON_RU.map(e => {return e.Date_reported});
        data.za.date = JSON_ZA.map(e => {return e.Date_reported});
        data.mx.date = JSON_MX.map(e => {return e.Date_reported});

        data.us.nuevos = JSON_US.map(e => {return e.New_cases});
        data.bz.nuevos = JSON_BZ.map(e => {return e.New_cases});
        data.in.nuevos = JSON_IN.map(e => {return e.New_cases});
        data.ru.nuevos = JSON_RU.map(e => {return e.New_cases});
        data.za.nuevos = JSON_ZA.map(e => {return e.New_cases});
        data.mx.nuevos = JSON_MX.map(e => {return e.New_cases});

        data.us.total = JSON_US.map(e => {return e.Cumulative_cases});
        data.bz.total = JSON_BZ.map(e => {return e.Cumulative_cases});
        data.in.total = JSON_IN.map(e => {return e.Cumulative_cases});
        data.ru.total = JSON_RU.map(e => {return e.Cumulative_cases});
        data.za.total = JSON_ZA.map(e => {return e.Cumulative_cases});
        data.mx.total = JSON_MX.map(e => {return e.Cumulative_cases});

        this.setState({
            dataPaises: data,
            cargarDataPaises: true
        });
    }

    render(){
        return(
            <div className="panel2__content-main">

                <div className="row panel2__content-main_row">
                    <div className="col-9 col-sm-7 panel2__content-main-column" >
                        {this.state.cargarMapa ? 
                            <Chart
                            width={'100%'}
                            height={'400px'}
                            chartType="GeoChart"
                            data={this.state.dataMapa}
                            options={{
                                backgroundColor:'rgb(44,62,80)',
                                colors:['red']
                            }}
                            mapsApiKey="AIzaSyDbnovar2QTgFrcX7KSvAndHT_wPnlU2Gc"
                            //   rootProps={{ 'data-testid': '1' }}
                            /> 
                            : <Cargando />
                        }
                    </div>
                    <div style={{height:"410px"}} className="col-2 col-sm-4 panel2__content-main-column overflow-auto">
                        {this.state.cargarListaPaises ? 
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">País</th>
                                        <th scope="col">Confirmados</th>
                                        <th scope="col">Muertes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.dataListaPaises.map(e =>{
                                            return (
                                                <tr key={`${e[0]}-${e[1]}`}>
                                                    <th scope="row"><img width={20} src={`https://covid19.who.int/countryFlags/${e[1].toLowerCase()}.png`} alt=""/></th>
                                                    <td>{e[0]}</td>
                                                    <td>{Intl.NumberFormat().format(e[2])}</td>
                                                    <td>{Intl.NumberFormat().format(e[3])}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            : <Cargando />
                        }
                    </div>
                </div>

                <div className="row panel2__content-main_row">
                    <div className="col-11 col-sm-11 panel2__content-main-column">
                        {
                            this.state.cargarJSONListaPaises ?
                            <BarChartCh
                                width={800}
                                height={500}
                                data={this.state.dataJSONListaPaises}
                                margin={{
                                top: 5, right: 40, left: 10, bottom: 5,
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                                <ReferenceLine y={0} stroke="#000" />
                                <BrushCh dataKey="name" height={30} stroke="#8884d8" />
                                <BarCh dataKey="confirmados" fill="red" />
                                <BarCh dataKey="muertes" fill="yellow" />
                            </BarChartCh>
                            : <Cargando />
                        }
                    </div>
                </div>
                
                {/* USA */}
                <CasosPaises 
                    cargarDataPaises={this.state.cargarDataPaises}
                    country="USA"
                    dataP={this.state.dataPaises.us}
                    cOt={17}
                    cCt={4.5}
                />

                {/* Brazil */}
                <CasosPaises 
                    cargarDataPaises={this.state.cargarDataPaises}
                    country="Brazil"
                    dataP={this.state.dataPaises.bz}
                    cOt={17}
                    cCt={2.6}
                />

                {/* India */}
                <CasosPaises 
                    cargarDataPaises={this.state.cargarDataPaises}
                    country="India"
                    dataP={this.state.dataPaises.in}
                    cOt={17}
                    cCt={1.6}
                />

                {/* Rusia */}
                <CasosPaises 
                    cargarDataPaises={this.state.cargarDataPaises}
                    country="Rusia"
                    dataP={this.state.dataPaises.ru}
                    cOt={17}
                    cCt={0.84}
                />

                {/* Sudáfrica */}
                <CasosPaises 
                    cargarDataPaises={this.state.cargarDataPaises}
                    country="Sudáfrica"
                    dataP={this.state.dataPaises.za}
                    cOt={17}
                    cCt={0.49}
                />

                {/* Mexico */}
                <CasosPaises 
                    cargarDataPaises={this.state.cargarDataPaises}
                    country="México"
                    dataP={this.state.dataPaises.mx}
                    cOt={17}
                    cCt={0.41}
                />
                
            </div>
        );
    }
}

export default World;