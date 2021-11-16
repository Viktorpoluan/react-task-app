import React from 'react'
import classes from './Money.module.css'

class Money extends React.Component {
    currentId = this.props.currentId
    render() {
        console.log(this.props.currentId)
        return (
            <div className={classes.money_box}>
                <ul className={classes.money_item}>
                        {this.props.moneyArr.map(i => {
                            return <li id={i.name} onClick={(e)=>this.props.chooseMoney(e)} >
                            <div id={i.index} accessKey={i.name}>{i.index}</div>&nbsp;<div id={i.index} accessKey={i.name}>{i.name}</div>
                            </li>
                                })}
                </ul>
            </div>
        )
    }
}

export default Money