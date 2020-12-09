import React from 'react';
import Bar from '../../assets/charts/Line';
import Cargando from '../Cargando';
import Chart from 'react-google-charts';
import MEXICO_STATES from '../../assets/data/Mexico_states';
import DataSet from '../../assets/data/covid/mexico/covid.json'; // https://covid19.sinave.gob.mx/Log.aspx -> Tasa de incidencia 03/08/2020
import EstadoConfirmados from '../../assets/data/covid/mexico/EstadoConfirmados.js';
import MX_CASES from '../../assets/data/covid/mexico/mx_03_08_2020';
import LineMexico from '../../assets/charts/LineMexico';

import {
    BarChart as BarChartCh, Bar as BarCh, Brush as BrushCh, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

class Mexico extends React.Component{

    state={
        dataMapa: [],
        cargarDataMapa: false,
        dataTotalMexico: [],
        cargarTotalMexico: false,
        dataEstados: [],
        cargarDataEstados: false,
        dataGaficaEstado: [],
        cargarGraficaEstados: false,
        dataCalendar: [],
        cargarDataCalendar: false,
        dataEstadosPorcentaje: [],
        cargarDataEstadosPorcentaje: false
    };

    async componentDidMount(){
        await this.getDataMapa();
        await this.getDataEstados();
        await this.getDataTotalMexico();
        await this.getDataGraficaEstados();
        await this.getDataCalendar();
        await this.getDataEstadosPorcentaje();
    }

    getDataMapa = async () =>{
        let arrData = await EstadoConfirmados.map(e => {
            return [
                e.edo,
                e.confirmados
            ]
        });

        let arrMapa = arrData.slice();
        arrMapa.unshift(['State','Confirmados']);

        this.setState({
            dataMapa: {
                data: arrData,
                mapa: arrMapa
            },
            cargarDataMapa: true
        });
    }

    getDataEstados = async () =>{
        let data = this.state.dataMapa.data.map(e => {
            return {
                name: e[0],
                confirmados: parseInt(e[1]),
            }
        });

        this.setState({
            dataEstados: data,
            cargarDataEstados: true
        });

    }

    getDataTotalMexico = async () =>{
        let dataCases = {
            new: [],
            total: []
        };
        let dataDeaths = {
            new: [],
            total: []
        };

        let arrLabels = await MX_CASES.map(e => {
            return e.date
        });

        dataCases.new = await MX_CASES.map(e =>{
            return e.new_cases
        });

        dataCases.total = await MX_CASES.map(e =>{
            return e.total_cs
        });

        dataDeaths.new = await MX_CASES.map(e =>{
            return e.new_dt
        });

        dataDeaths.total = await MX_CASES.map(e =>{
            return e.total_dt
        });
        
        this.setState({
            dataTotalMexico: {
                labels: arrLabels,
                new_cases: dataCases.new,
                total_cases: dataCases.total,
                new_deaths: dataDeaths.new,
                total_deaths: dataDeaths.total
            },
            cargarTotalMexico: true
        });
    }

    getDataGraficaEstados = async () =>{
        let arrData = [];
        let arrLabels = [];
        let dataGE = [];
        let dataEstado;

        for (let i in MEXICO_STATES){
            dataGE = [];
            dataEstado = DataSet.filter(e => {return e.edo === MEXICO_STATES[i]})
    
            for (let j in dataEstado){
                dataGE.push(dataEstado[j].valor);
            }
            
            arrData.push(dataGE);
        }

        arrLabels = dataEstado.map(e =>{
            return "Semana " + e.semana
        })

        this.setState({
            dataGaficaEstado:{
                labels: arrLabels,
                data: arrData,
            },
            cargarGraficaEstados: true
        });
    }

    getDataCalendar = async () =>{
        let data = await MX_CASES.map(e =>{
            return [
                new Date(
                    parseInt(e.date.substring(0, 4)),
                    parseInt(e.date.substring(5, 7)),
                    parseInt(e.date.substring(8, 10)),
                ),
                e.new_cases
            ]
        });

        data.unshift([{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }]);

        this.setState({
            dataCalendar: data,
            cargarDataCalendar: true
        });
    }

    getDataEstadosPorcentaje = async () =>{
        let data = this.state.dataEstados.map(e => {
            return [
                e.name,
                e.confirmados
            ]
        });

        data.unshift(['Estado', 'Total casos']);

        this.setState({
            dataEstadosPorcentaje: data,
            cargarDataEstadosPorcentaje: true
        });
    }

    render(){
        return(
            <div className="panel2__content-main">

                {/* Fila 1: Mapa y tabla */}
                <div className="row panel2__content-main_row">
                    <div className="col-9 col-sm-7 panel2__content-main-column" >
                        {this.state.cargarDataMapa ? 
                            <Chart
                            width={'100%'}
                            height={''}
                            chartType="GeoChart"
                            data={this.state.dataMapa.mapa}
                            options={{
                              region: 'MX', // Mexico
                              resolution: 'provinces',
                              backgroundColor: 'rgb(44,62,80)',
                              datalessRegionColor: 'gray',
                              defaultColor: '#f5f5f5',
                              colorAxis: { colors: ['red'] },
                            }}
                            // mapsApiKey=""
                            // rootProps={{ 'data-testid': '2' }}
                          />
                            : <Cargando />
                        }
                    </div>
                    <div style={{height:"410px"}} className="col-2 col-sm-4 panel2__content-main-column overflow-auto">
                        {this.state.cargarDataMapa ? 
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Confirmados</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.dataMapa.data.map(e =>{
                                            return (
                                                <tr key={`MX-${e[0]}`}>
                                                    <th scope="row">{e[0]}</th>
                                                    <td>{Intl.NumberFormat().format(e[1])}</td>
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

                {/* Fila 2: Graficas de linea, Casos y muertes en mexico */}
                <div className="row panel2__content-main_row">
                    <div className="col-5 col-sm-5 panel2__content-main-column" >
                        {this.state.cargarTotalMexico ? 
                            <LineMexico 
                                labels={this.state.dataTotalMexico.labels}
                                dataLineCases={this.state.dataTotalMexico.total_cases}
                                dataLineDeaths={this.state.dataTotalMexico.total_deaths}
                                name="Casos Totales"
                            />
                            : <Cargando />
                        }
                    </div>
                    <div className="col-6 col-sm-6 panel2__content-main-column">
                        {this.state.cargarTotalMexico ? 
                            <LineMexico 
                                labels={this.state.dataTotalMexico.labels}
                                dataLineCases={this.state.dataTotalMexico.new_cases}
                                dataLineDeaths={this.state.dataTotalMexico.new_deaths}
                                name="Casos Diarios"
                            />
                            : <Cargando />
                        }
                    </div>
                </div>

                {/* Fila 3: Calendario */}
                <div className="row panel2__content-main_row">
                    {this.state.cargarDataCalendar ? 
                        <Chart
                            width={1000}
                            height={200}
                            chartType="Calendar"
                            loader={<div></div>}
                            data={this.state.dataCalendar}
                            options={{
                                colors: "red",
                            title: '',
                            }}
                            // rootProps={{ 'data-testid': '2' }}
                        />
                            : <Cargando />
                        }
                </div>

                {/* Fila 4: Grafica de barras de casos por estado */}
                <div className="row panel2__content-main_row">
                    <div className="col-11 col-sm-11 panel2__content-main-column">
                        {
                            this.state.cargarDataEstados ?
                            <BarChartCh
                                width={800}
                                height={500}
                                data={this.state.dataEstados}
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
                            </BarChartCh>
                            : <Cargando />
                        }
                    </div>
                </div>

                {/* Fila 5: Graficas de lines por estados y grafica circular */}
                <div className="row panel2__content-main_row">
                    <div  style={{height:"300px"}} className="col-9 col-sm-7 panel2__content-main-column overflow-auto" >
                        {this.state.cargarGraficaEstados ? 
                            MEXICO_STATES.map(e => {
                                return <Bar 
                                    key={e} 
                                    name={e} 
                                    labels={this.state.dataGaficaEstado.labels} 
                                    data1={this.state.dataGaficaEstado.data[MEXICO_STATES.indexOf(e)]}
                                />
                            })
                            : <Cargando />
                        }
                    </div>
                    <div className="col-2 col-sm-4 panel2__content-main-column">
                        {this.state.cargarDataEstadosPorcentaje ?
                            <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div></div>}
                            data={this.state.dataEstadosPorcentaje}
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

            </div>
        );
    }
}

export default Mexico;