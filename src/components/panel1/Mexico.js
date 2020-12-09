import React from 'react';
import CardTotal from './CardTotal';
import ActualizacionDatos from '../../assets/data/covid/mexico/ActualizacionDatos';

class Mexico extends React.Component{
    render(){
        
        return(
            <div className="panel1__content-main">
                <CardTotal title="Confirmados" num={ActualizacionDatos.Cases} color="danger"/>
                <CardTotal title="Muertes" num={ActualizacionDatos.Deaths} color="warning"/>
                <CardTotal title="Recuperados" num={ActualizacionDatos.Recovered} color="success"/>
            </div>
        );
    }
}

export default Mexico;