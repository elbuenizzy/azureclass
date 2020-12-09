import React from 'react';
import World from './panel2/World';
import Mexico from './panel2/Mexico';
import Morelos from './panel2/Morelos';

class Panel2 extends React.Component{
    
    render = () =>{
        const {covid_state} = this.props;
        return(
            <section className="panel2__content overflow-auto">
                {
                    (covid_state === 2) ? <Mexico />
                    : (covid_state === 3) ? <Morelos />
                    : <World />
                }
            </section>
        );
    }
}

export default Panel2;