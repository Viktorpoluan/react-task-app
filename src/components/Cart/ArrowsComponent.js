import React from 'react'
import classes from './Cart.module.css'


class ArrowsComponent extends React.Component {

    state = {
        count: 0
    }

    arrowRight = (arr) => {
        if (this.state.count < arr.length - 1) {
            this.setState({count:this.state.count + 1})
        } else {
            this.setState({count: 0})
        }
    }
    arrowLeft = (arr) => {
        if (this.state.count > 0) {
            this.setState({count:this.state.count - 1})
        } else {
            this.setState({count: arr.length-1})
        }
    }

    render() {
        return (
            <div style={{display:'inline-flex',alignItems:'start', marginTop: '10px'}}>
                <div style={{display:'inline-flex',alignItems:'center', marginLeft:'15px'}}>
                    <div className={classes.vector_left} onClick={()=>this.arrowLeft(this.props.gallery)}></div>
                    <div className={classes.pict}>
                        <img src={this.props.gallery[this.state.count]}/>
                    </div>
                    <div className={classes.vector_right} onClick={() => this.arrowRight(this.props.gallery)}></div>
                </div>
            </div>

            
    )
    }
}

export default ArrowsComponent