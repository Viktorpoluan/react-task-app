import React from 'react'
import classes from './Cart.module.css'

class Counter extends React.Component {
    state = {
        count: 1
    }

    increment = () => {
        this.setState(prev => ({ count: prev.count + 1 }))
    }
    decrement = () => {
        this.state.count>1?this.setState(prev => ({ count: prev.count - 1 })):console.log('error')
    }

    render() {
        return (
            <div className={classes.items}>
            <div className={classes.plus} style={{cursor: 'pointer'}}
                 onClick={() => this.increment()}>
                <div style={{width: '15px'}}>+</div>
            </div>
            <div className={classes.count_img}>{this.state.count}</div>
            <div className={classes.minus} style={{cursor: 'pointer'}}
                 onClick={() => this.decrement()}>
                <div style={{width: '15px'}}>-</div>
            </div>
        </div>
        )
    }
}
export default Counter