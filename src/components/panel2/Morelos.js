import React from "react";
import { Chart } from "react-google-charts";
import Bar from '../../assets/charts/Line';
import MUNICIPIOS_M from '../../assets/data/MUNICIPIOS_M';
import MorelosMCP from  '../../assets/data/covid/mexico/MorelosMCP.json'; // https://covid19.sinave.gob.mx/Log.aspx -> Tasa de incidencia 03/08/2020
import Cargando from '../Cargando';
import ActualizacionDatosMor from '../../assets/data/covid/mexico/ActualizacionDatosMor';

import {
    BarChart as BarChartCh, Bar as BarCh, Brush as BrushCh, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Otro extends React.Component {
	state={
		dataGaficaMunicipio: [],
		cargardataGaficaMunicipio: false,
		dataLista: [],
		dataListaPorcentaje: [],
		dataMapa: [],
		dataGraficaTotalCasos: [],
		dataGraficaTotalCasos2: [],
		cargarDataCasos: false,
	};
	
	async componentDidMount(){
		await this.getDataGraficaMunicipios();
		await this.getDataTreeMap();
	}

	getDataGraficaMunicipios = async () =>{
        let arrData = [];
        let arrLabels = [];
        let dataGrficaM = [];
        let dataMunicipio;

        for (let i in MUNICIPIOS_M){
            dataGrficaM = [];
            dataMunicipio = MorelosMCP.filter(e => {return e.edo === MUNICIPIOS_M[i]})
    
            for (let j in dataMunicipio){
                dataGrficaM.push(dataMunicipio[j].valor);
            }
            
            arrData.push(dataGrficaM);
        }

        arrLabels = dataMunicipio.map(e =>{
            return "Semana " + e.semana
        })

        this.setState({
            dataGaficaMunicipio:{
                labels: arrLabels,
                data: arrData,
            },
            cargardataGaficaMunicipio: true
        });
	}
	
	getDataTreeMap = async () =>{
		let dataTMapa = [];
		let dataList = ActualizacionDatosMor.slice();
		let dataListPorcentaje = [];
		let dataGMunicipios = [];
		let dataGMunicipios2 = [];
		let total= 0;
        let arr;
        
        dataTMapa = ActualizacionDatosMor.map(e =>{
            return [e[0], "Morelos", e[1]]
        });

        dataGMunicipios = ActualizacionDatosMor.map(e =>{
            return {name: e[0], confirmados: e[1], muertes: e[2], recuperados: e[3]}
        });
        
        dataGMunicipios2 = ActualizacionDatosMor.map(e =>{
            return {name: e[0], confirmados: (e[1] - e[3]) - e[2], muertes: e[2], recuperados: e[3]}
        });
		
		dataTMapa.unshift(['Morelos', null, 0]);
		dataTMapa.unshift(['Municipio', 'Estado', 'Confirmados']);

		dataListPorcentaje = dataList.map(e => {
            return [e[0], e[1]]
        });
		dataListPorcentaje.unshift(['Municipio', 'Total casos']);
		
		this.setState({
			dataLista: dataList,
			dataMapa: dataTMapa,
			dataListaPorcentaje: dataListPorcentaje,
			dataGraficaTotalCasos: dataGMunicipios,
			dataGraficaTotalCasos2: dataGMunicipios2,
			cargarDataCasos: true,
		});
	}

    render() {
        return (
        	<div className="panel2__content-main">

				{/* Fila 1: Mapa y tabla */}
                <div className="row panel2__content-main_row">
                    <div className="col-9 col-sm-7 panel2__content-main-column" >
                        {this.state.cargarDataCasos ? 
                            <Chart
							width={'100%'}
							height={'400px'}
							chartType="TreeMap"
							loader={<div></div>}
							data={this.state.dataMapa}
							options={{
							  minColor: 'white',
							  midColor: 'orange',
							  maxColor: 'red',
							  headerHeight: 15,
							  fontColor: 'rgb(44,62,80)',
							  showScale: true,
							}}
							// rootProps={{ 'data-testid': '1' }}
						  />
                            : <Cargando />
                        }
                    </div>
                    <div style={{height:"410px"}} className="col-2 col-sm-4 panel2__content-main-column overflow-auto">
                        {this.state.cargarDataCasos ?
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">Municipio</th>
                                        <th scope="col">Confirmados</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.dataLista.map(e =>{
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

				{/* Fila 4: Grafica de barras de casos por estado */}
                <div className="row panel2__content-main_row">
                    <div className="col-11 col-sm-11 panel2__content-main-column">
                        {
                            this.state.cargarDataCasos ?
                            <BarChartCh
                                width={800}
                                height={500}
                                data={this.state.dataGraficaTotalCasos}
                                stackOffset="sign"
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
                                <BarCh dataKey="confirmados" fill="red" stackId="stack" />
                                <BarCh dataKey="recuperados" fill="green" stackId="stack" />
                                <BarCh dataKey="muertes" fill="gray" stackId="stack" />
                            </BarChartCh> 
                            : <Cargando />
                        }
                    </div>
                </div>

				{/* Fila 4 - 2: Grafica de barras de casos por estado */}
                <div className="row panel2__content-main_row">
                    <div className="col-11 col-sm-11 panel2__content-main-column">
                        {
                            this.state.cargarDataCasos ?
                            <BarChartCh
                                width={800}
                                height={500}
                                data={this.state.dataGraficaTotalCasos2}
                                stackOffset="sign"
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
                                <BarCh dataKey="confirmados" fill="red" stackId="stack" />
                                <BarCh dataKey="recuperados" fill="green" stackId="stack" />
                                <BarCh dataKey="muertes" fill="gray" stackId="stack" />
                            </BarChartCh> 
                            : <Cargando />
                        }
                    </div>
                </div>

				{/* Fila 5: Graficas de lines por estados y grafica circular */}
				<div className="row panel2__content-main_row">
                    <div  style={{height:"300px"}} className="col-9 col-sm-7 panel2__content-main-column overflow-auto" >
                        {this.state.cargarDataCasos ? 
                            MUNICIPIOS_M.map(e => {
                                return <Bar 
                                    key={e} 
                                    name={e} 
                                    labels={this.state.dataGaficaMunicipio.labels} 
                                    data1={this.state.dataGaficaMunicipio.data[MUNICIPIOS_M.indexOf(e)]}
                                />
                            })
                            : <Cargando />
                        }
                    </div>
                    <div className="col-2 col-sm-4 panel2__content-main-column">
                        {this.state.cargarDataCasos ? 
                            <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div></div>}
                            data={this.state.dataListaPorcentaje}
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

export default Otro;
