import React from 'react';
import CardTotal from './CardTotal';

class World extends React.Component{
    render(){
        const {data} = this.props;
        
        return(
            <div className="panel1__content-main">
                <CardTotal title="Confirmados" num={data.casos} color="danger"/>
                <CardTotal title="Muertes" num={data.deaths} color="warning"/>
                <CardTotal title="Recuperados" num={data.recovered} color="success"/>
            </div>
        );
    }
}

export default World;