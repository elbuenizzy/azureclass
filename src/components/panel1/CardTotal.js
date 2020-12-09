import React from 'react';

class CardTotal extends React.Component{
    render(){
        const {title, num, color} = this.props;

        return(
            <div className="card text-white bg-dark mb-3">
                <div className="card-header font-weight-bold">{title}</div>
                <div className="card-body">
                    <div className="text-center">
                        <span className={`badge badge-${color} panel1__content-main-card-total-num`}>
                            {new Intl.NumberFormat().format(num)}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardTotal;