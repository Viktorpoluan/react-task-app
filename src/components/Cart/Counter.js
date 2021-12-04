import React from 'react'
import classes from './Cart.module.css'
import Data from './Data'

class Counter extends React.Component {
    state = {
        count: 1
    }
   

    increment = () => {
        this.setState(prev => ({count: prev.count + 1}))
    }
    decrement = () => {
        this.state.count > 1 ? this.setState(prev => ({count: prev.count - 1})) : console.log('error')
    }

    render() {
        return (
            <div style={{display:'inline-flex'}}>
                <div style={{display:'block', width:'600px'}}>
                    <div className={classes.param_price}>
                        {this.props.currentId} {this.props.event.prices.filter(i => i.currency === this.props.currentName).map(i => (i.amount * this.state.count).toFixed(2) )}
                    </div>
                    <Data event={this.props.event}
                          blablabla={this.blablabla}
                          selectedNames={this.props.selectedNames}
                          logicArray={this.props.logicArray}
                          chosenStyle={this.props.chosenStyle}
                          showCart={this.props.showCart}
                    />
                </div>
                <div className={classes.items}>
                    <div className={classes.plus} style={{cursor: 'pointer'}}
                         onClick={() => {
                             this.props.updateData(this.state.count + 1)
                             this.increment()
                         }}>
                        <div style={{width: '15px'}}>+</div>
                    </div>
                    <div className={classes.count_img}>{this.state.count}</div>
                    <div className={classes.minus} style={{cursor: 'pointer'}}
                         onClick={() => {
                             this.state.count !== 1 ? this.props.updateData(this.state.count - 1) : console.log('')
                             this.decrement()
                         }}>
                        <div style={{width: '15px'}}>-</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Counter