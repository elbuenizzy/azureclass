import React from 'react';
import World from './panel1/World';
import Mexico from './panel1/Mexico';
import Morelos from './panel1/Morelos';
import PANEL1_IMAGENES from '../assets/PANEL1_IMAGENES';

class Panel1 extends React.Component{
    state = {
        dataCasos:{
            world:{
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
        let resp = await fetch('https://api.covid19api.com/world/total');
        let data = await resp.json();

        await this.setState({
            dataCasos:{
                world:{
                    casos: data.TotalConfirmed,
                    deaths: data.TotalDeaths,
                    recovered: data.TotalRecovered,
                },
            },
        });

        // console.log(this.state.dataCasos);
    }

    render = () =>{
        const {covid_state} = this.props;
        
        return(
            <section className="panel1__content overflow-auto">

                <div className="text-center panel1__content-header">
                    <figure>
                        <img 
                            src={PANEL1_IMAGENES[covid_state - 1].url}
                            className="rounded" 
                            alt={PANEL1_IMAGENES[covid_state - 1].alt}
                        />  
                    </figure>
                    <span className="h4">{PANEL1_IMAGENES[covid_state - 1].name}</span>
                </div>
               
                {
                    (covid_state === 2) ? <Mexico />
                    : (covid_state === 3) ? <Morelos />
                    : <World data={this.state.dataCasos.world} />
                }

            </section>
        );
    }
}

export default Panel1;