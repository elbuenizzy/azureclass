import React from 'react';
import ActualizacionDatos from '../assets/data/covid/mexico/ActualizacionDatos';
import PANEL1_IMAGENES from '../assets/PANEL1_IMAGENES';

class HeaderNav extends React.Component{
    state = {
        dataNewCasos:{
            world:{
                casos: 0,
                deaths: 0,
                recovered: 0,
            },
            mexico:{
                casos: 0,
                deaths: 0,
                recovered: 0,
            },
            morelos:{
                casos: 0,
                deaths: 0,
                recovered: 0,
            }
        },
    };

    async componentDidMount(){
        await this.fetchDataTotalCasos();
    }

    fetchDataTotalCasos = async () =>{
        let resp = await fetch('https://api.covid19api.com/summary');
        let data = await resp.json();

        await this.setState({
            dataNewCasos:{
                world:{
                    casos: data.Global.NewConfirmed,
                    deaths: data.Global.NewDeaths,
                    recovered: data.Global.NewRecovered,
                },
                mexico:{
                    casos: ActualizacionDatos.newCases,
                    deaths: ActualizacionDatos.newDeaths,
                    recovered: ActualizacionDatos.newRecovered,
                },
                morelos:{
                    casos: ActualizacionDatos.newMrCases,
                    deaths: ActualizacionDatos.newMrDeaths,
                    recovered: ActualizacionDatos.newMrRecovered,
                }
            },
        });

    }

    render(){
        const { onCovidState, covid_state} = this.props;

        return(
            <div className="covid__nav">

                <div className="row">
                    <div className="col-3">
                        
                    </div>
                    <div className="col-9">
                        <div className="row">

                            <div className="col-6 col-md-3">
                                <div className="covid__nav-new">
                                    <span className="covid__nav-new-title">+ Confirmados</span>
                                    <span className="covid__nav-new-num">
                                        {
                                            (covid_state === 2) ? Intl.NumberFormat().format(this.state.dataNewCasos.mexico.casos)
                                            : (covid_state === 3) ? Intl.NumberFormat().format(this.state.dataNewCasos.morelos.casos)
                                            : Intl.NumberFormat().format(this.state.dataNewCasos.world.casos)
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="col-6 col-md-2">
                                <div className="covid__nav-new">
                                    <span className="covid__nav-new-title">+ Muertes</span>
                                    <span className="covid__nav-new-num">
                                        {
                                            (covid_state === 2) ? Intl.NumberFormat().format(this.state.dataNewCasos.mexico.deaths)
                                            : (covid_state === 3) ? Intl.NumberFormat().format(this.state.dataNewCasos.morelos.deaths)
                                            : Intl.NumberFormat().format(this.state.dataNewCasos.world.deaths)
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="col-6 col-md-2">
                                <div className="covid__nav-new">
                                    <span className="covid__nav-new-title">+ Recuperados</span>
                                    <span className="covid__nav-new-num">
                                        {
                                            (covid_state === 2) ? Intl.NumberFormat().format(this.state.dataNewCasos.mexico.recovered)
                                            : (covid_state === 3) ? Intl.NumberFormat().format(this.state.dataNewCasos.morelos.recovered)
                                            : Intl.NumberFormat().format(this.state.dataNewCasos.world.recovered)
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="col-6 col-md-4 covid__nav-button">
                                <button style={{backgroundImage:`url(${PANEL1_IMAGENES[0].url})`}} name="todos_paises" id="cs-1" onClick={onCovidState}>
                                </button>
                                <button style={{backgroundImage:`url(${PANEL1_IMAGENES[1].url})`}} name="mexico" id="cs-2" onClick={onCovidState}>
                                </button>
                                <button style={{backgroundImage:`url(${PANEL1_IMAGENES[2].url})`}} name="morelos" id="cs-3" onClick={onCovidState}>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default HeaderNav;