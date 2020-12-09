import React from 'react';
import HeaderNav from '../components/HeaderNav';
import Panel1 from '../components/Panel1';
import Panel2 from '../components/Panel2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import '../styles/index.css';
import '../styles/chart-box.css';

class Inicio extends React.Component{
    state = {
        covid_state: 1,
    };

    handleChangeCovidState = (e) =>{
        let _id = e.target.id.substring(0,3);
        
        if (_id === "cs-"){
            let num = parseInt(e.target.id.substring(3,4));

            if (num >= 1 && num <= 3){
                this.setState({
                    covid_state: num
                });
            }
        }
    }

    render = () =>{
        const {covid_state} = this.state;

        return (
            <main className="container-fluid covid__main">
                <div className="row">
                    <div className="col-12">
                        <HeaderNav covid_state={covid_state} onCovidState={this.handleChangeCovidState}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 covid__panel1">
                        <Panel1 covid_state={covid_state}/>
                    </div>
                    <div className="col-9 covid__panel2">
                        <Panel2 covid_state={covid_state}/>
                    </div>
                </div>
            </main>
        );
    }
}

export default Inicio;