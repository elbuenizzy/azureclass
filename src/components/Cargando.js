import React from 'react';

class Cargando extends React.Component{
    render(){
        return(
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}

export default Cargando;