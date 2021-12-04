import React from 'react';
import {gql} from "@apollo/client";
import {graphql} from "@apollo/client/react/hoc";
import Category from "./Category/Category";
import classes from "./Category/Category.module.css";
import ReactHtmlParser from 'react-html-parser'
import Cart from "./Cart/Cart";
import OverlayCart from "./OverlayCart/OverlayCart";
import Money from "./Money/Money";

const queryCategory = gql`
query{
categories{
  name, products{
   id, name,description, prices{
    currency,amount,__typename
  }, gallery, inStock, attributes{
   name,type,items{
      displayValue,value, id
    }
  } 
  }
}
}
`

class App extends React.Component {
    state = {
        name: '',
        currentCategory: 0,
        active: false,
        path: ['/'],
        arr: null,
        isActives: false,
        isActiveOverCart: false,
        prodInCart: [],
        cart: {
            cartProductsName: [],
            cartProductsId: [],
            selectedItems: [],
            selectedNames: [],
            isChoseItem: []
        },
        counterCart: 0,
        activeMoney: false,
        moneyArr: [
            {name: 'USD', index: '$'},
            {name: 'GBP', index: '£'},
            {name: 'AUD', index: '$'},
            {name: 'JPY', index: '¥'},
            {name: 'RUB', index: '₽'},
        ],
        currentId: '$',
        currentName: 'USD',
        currentPicture: 0,
        activeStateCart: false,
        activeStateOverCart: false,
        arrs:[],
        color: classes.wrapper_value,
        chosen: classes.wrapper_chosen,
        emptyCart:true
    }
    showData = () => this.props.data.loading === true ? console.log('Loading...') : this.props.data.categories[this.state.currentCategory].name.toUpperCase()
    showAllData = () => this.props.data.loading === true ? console.log('Loading...') : this.props.data.categories.map(arr => arr.name)
    nullArr = (arr) => {
        for (let i = 0; i <= arr.length; i++) {
            arr.pop()
        }
        return arr.pop()
    }
    onclickBack = () => {
        this.setState({
            selectedItems: this.nullArr(this.state.cart.selectedItems)
        })
        if (this.state.active && !this.state.isActives) {
            this.setState({
                active: !this.state.active
            })

        } else if (this.state.isActives) {
            this.setState({
                isActives: !this.state.isActives
            })
        }
        console.log(this.state.cart.selectedItems, this.state.cart.selectedNames)
    }
    chooseMoney = (e) => {
        this.setState({currentId: e.target.id})
        this.setState({currentName: e.target.accessKey})
        this.setState({activeMoney: false})
    }


    showAllCategories = () => this.props.data.loading === true ? console.log('Loading...') : this.props.data.categories[this.state.currentCategory].products.map((prod, index) => {
        return prod.inStock !== true
            ? <div key={index} className={classes.products_stock}>
                <div className={classes.stock}>OUT OF STOCK</div>
                <div style={{height: '338px', width: '356px', display: 'contents'}}>
                    <div className={classes.img_prod}>
                        <img src={prod.gallery[0]} alt={'pict'}/>
                    </div>
                </div>
                <div id={prod.id} className={classes.common}/>
                <div id={'prod'} accessKey={'false'} className={classes.tittle}
                     style={{cursor: 'default'}}> {prod.name}</div>
                <div style={{cursor: 'default'}}
                     className={classes.prices}>{this.state.currentId} {prod.prices.filter(i => i.currency === this.state.currentName).map(i => i.amount)}</div>
            </div>
            : <div key={index} className={classes.products}>
                <div style={{height: '338px', width: '356px', display: 'contents'}}>
                    <div className={classes.img_prod}>
                        <img src={prod.gallery[0]} alt={'pict'}/>
                    </div>
                </div>
                <div id={prod.id} accessKey={this.props.data.categories[this.state.currentCategory].name}
                     className={classes.common}
                     onClick={(event) => {
                         if (event.target.id) {
                             this.setState({
                                 cartProductsName: this.state.cart.cartProductsName.push(event.target.accessKey)
                             })
                             this.setState({
                                 cartProductsId: this.state.cart.cartProductsId.push(event.target.id)
                             })
                             this.setState({
                                 counterCart: this.state.counterCart + 1
                             })
                             this.setState({emptyCart:false})
                         }
                     }
                     }
                />
                <div id={'prod'} accessKey={'true'} className={classes.tittle}> {prod.name}</div>
                <div
                    className={classes.prices}>{this.state.currentId} {prod.prices.filter(i => i.currency === this.state.currentName).map(i => i.amount)}</div>
            </div>
    })

    onclick = (event) => {
        // console.log(event)
        if (event.target.innerText && event.target.id === 'prod' && event.target.accessKey === 'true') {
            this.setState({
                name: event.target.innerText
            })
            this.setState({
                active: true
            })
        }
    }
    changeCategory = () => {
        if (this.state.currentCategory + 1 === this.showAllData().length) {
            this.setState({
                currentCategory: 0
            })
        } else {
            this.setState({
                currentCategory: this.state.currentCategory + 1
            })
        }
    }
    clearCart=()=>{
        this.setState({emptyCart:true})
        this.nullArr(this.state.cart.selectedNames)
        this.nullArr(this.state.cart.selectedItems)
        this.nullArr(this.state.cart.cartProductsName)
        this.nullArr(this.state.cart.cartProductsId)
        this.setState({counterCart: 0})
    }

    getRandomId=(min, max)=> {
        return Math.random() * (max - min) + min;
    }
    chosenStyle = (value, name) => {
        let isActives = false
        for (let i = 0; i < this.state.cart.selectedNames.length; i++) {
            for (let a = 0; a < this.state.cart.selectedNames[i].length; a++) {
                if((value+name === this.state.cart.selectedNames[i][a].value+this.state.cart.selectedNames[i][a].name)){
                    return !isActives
                }
            }
        }
    }
    filterProduct = () => {
        function gallery(arr) {
            let arr1 = []
            for (let i = 0; i < arr.length; i++) {
                arr1.push({count: arr[i]})
            }
            return arr1
        }

        const data = this.props.data
        if (!data.loading) {
            return data.categories[this.state.currentCategory].products.filter(el => el.name === this.state.name).map((elem, index) => {
                return <div key={index} className={classes.wrapper_filter}>
                    <div style={{flexDirection: 'column'}}>
                        {gallery(elem.gallery).map((i, index) => {
                            return <div><img onMouseEnter={() => this.setState({currentPicture: index})}
                                             onMouseLeave={() => this.setState({currentPicture: 0})}
                                             key={index}
                                             src={i.count} alt={'pict'}
                                             style={{height: '87px', marginBottom: '33px', cursor: 'pointer'}}/></div>
                        })}
                    </div>
                    <div className={classes.i_img}><img src={elem.gallery[this.state.currentPicture]} alt={'pict'}/></div>
                    <div className={classes.main}>
                        <div className={classes.prod_name}>{elem.name}</div>
                        <div className={classes.item_box}>{elem.attributes.map((item, index) => {
                            return <div key={index}>
                                <div className={classes.item_name}>{item.name.toUpperCase()}:</div>
                                <div className={classes.item_pos}>
                                    {item.items.map(i => {
                                            return <div>
                                                {item.name === 'Color'
                                                    ? <div id={i.value + item.name}
                                                           style={{
                                                               border: '1px solid black',
                                                               backgroundColor: i.value
                                                           }}
                                                           className={classes.wrapper_value}
                                                           onClick={() => {
                                                               console.log(this.state.arrs)
                                                               let divId = document.getElementById(i.value + item.name)

                                                               if (this.state.cart.selectedItems.length === 0) {
                                                                   this.setState({
                                                                       selectedItems: this.state.cart.selectedItems.push({
                                                                           name: item.name,
                                                                           value: i.value,
                                                                           id:elem.id
                                                                       })
                                                                   })
                                                                   divId.className = classes.color_choosen
                                                               } else {
                                                                   this.setState({
                                                                       selectedItems: this.state.cart.selectedItems.push({
                                                                           name: item.name,
                                                                           value: i.value,
                                                                           id:elem.id

                                                                       })
                                                                   })
                                                                   divId.className = classes.color_choosen
                                                                   for (let i = 1; i < this.state.cart.selectedItems.length; i++) {
                                                                       if (item.name === this.state.cart.selectedItems[i - 1].name) {
                                                                           this.state.cart.selectedItems.splice([i - 1], 1)
                                                                       }
                                                                   }
                                                               }
                                                           }
                                                           }>{' '}</div>
                                                    : <div id={i.value + item.name}
                                                           className={this.state.color}
                                                           style={{
                                                               minWidth: '63px',
                                                               minHeight: '45px',
                                                               marginTop: '10px',
                                                               marginRight: '12px'
                                                           }}
                                                           onClick={() => {
                                                               let divId = document.getElementById(i.value + item.name)

                                                               if (this.state.cart.selectedItems.length === 0) {
                                                                   this.setState({
                                                                       selectedItems: this.state.cart.selectedItems.push({
                                                                           name: item.name,
                                                                           value: i.value,
                                                                           id: elem.id,
                                                                           counter: this.state.counterCart
                                                                       })
                                                                   })
                                                                   divId.className = this.state.chosen
                                                               } else {
                                                                   this.setState({
                                                                       selectedItems: this.state.cart.selectedItems.push({
                                                                           name: item.name,
                                                                           value: i.value,
                                                                           id: elem.id,
                                                                           counter: this.state.counterCart
                                                                       })
                                                                   })
                                                                   divId.className = classes.wrapper_chosen
                                                                   for (let i = 1; i < this.state.cart.selectedItems.length; i++) {
                                                                       if (item.name === this.state.cart.selectedItems[i - 1].name) {
                                                                           this.state.cart.selectedItems.splice([i - 1], 1)
                                                                       }


                                                                   }
                                                               }
                                                           }
                                                           }
                                                    >
                                                        {i.value}
                                                    </div>
                                                }
                                            </div>
                                        }
                                    )}
                                </div>
                            </div>
                        })}
                        </div>
                        <div className={classes.price}>
                            PRICE:
                        </div>
                        <div>{this.state.currentId} {elem.prices.filter(i => i.currency === this.state.currentName).map(i => i.amount)}</div>
                        <div onClick={(event) => {
                            if (event.target.id) {
                                this.setState({cartProductsName: this.state.cart.cartProductsName.push(event.target.accessKey)})
                                this.setState({cartProductsId: this.state.cart.cartProductsId.push(event.target.id)})
                                this.setState({counterCart: this.state.counterCart + 1})
                                this.setState({selectedNames: this.state.cart.selectedNames.push(this.state.cart.selectedItems.concat())})
                                this.setState({selectedItems: this.nullArr(this.state.cart.selectedItems)})
                                this.setState({emptyCart:false})
                            }
                        }}>
                            <button className={classes.button_add} id={elem.id}
                                    accessKey={data.categories[this.state.currentCategory].name}>
                                ADD TO CART
                            </button>
                        </div>
                        <div className={classes.text_desc}>{ReactHtmlParser(elem.description)}</div>
                    </div>
                </div>
            })
        }
    }
    showCart = () => {
        const data = this.props.data
        if (data.loading === true) {
            console.log('loads..')
        } else {
            function counterQ(arr, arr2) {
                const _cart = []
                    for (let i = 0; i < arr.length; i++) {
                        _cart.push(data.categories.filter(el => el.name === arr[i])[0].products.filter(el => el.id === arr2[i])[0])
                    }
                    return _cart
            }
            return counterQ(this.state.cart.cartProductsName, this.state.cart.cartProductsId)
        }
    }
    activator = () => {
        this.setState({isActiveOverCart: true})
    }
    deactivator = () => {
        this.setState({isActiveOverCart: false})
    }

    render() {
        console.log(this.showCart())
        return (
            <>
                <header>
                    <div className={classes.header}>
                        <div className={classes.nav}>
                            <ul className={classes.ul}>
                                <li>WOMEN</li>
                                <li>MEN</li>
                                <li>KIDS</li>
                            </ul>
                            <div className={classes.img_header} onClick={() => this.onclickBack()}/>
                            <div className={classes.s}>{this.state.currentId}</div>
                            <div className={this.state.activeMoney ? classes.img_vector_active : classes.img_vector}
                                 onClick={() => this.setState({
                                     activeMoney: !this.state.activeMoney
                                 })}/>
                            {this.state.activeMoney
                                ? <Money moneyArr={this.state.moneyArr}
                                         currentId={this.state.currentId}
                                         chooseMoney={this.chooseMoney}
                                />
                                : null
                            }
                            <div className={classes.empty_cart} onClick={() => {
                                this.setState({
                                    isActives: true
                                })
                            }}
                                 onMouseEnter={() => {
                                     this.activator()
                                 }}
                            />
                            {this.state.isActiveOverCart
                                ?
                                <OverlayCart activator={this.activator}
                                             deactivator={this.deactivator}
                                             showCart={this.showCart()}
                                             counterCart={this.state.counterCart}
                                             currentName={this.state.currentName}
                                             currentId={this.state.currentId}
                                             selectedNames={this.state.cart.selectedNames}
                                             emptyCart={this.state.emptyCart}
                                             clearCart={this.clearCart}
                                             chosenStyle={this.chosenStyle}
                                />
                                : null
                            }
                            {this.state.counterCart === 0
                                ? null
                                : <div className={classes.rectangle_wrap}>
                                    <div className={classes.rectangle}>
                                        <div className={classes.rectangle_text}>
                                            {this.state.counterCart}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </header>
                {this.state.isActives
                    ? <Cart
                        emptyCart={this.state.emptyCart}
                        clearCart={this.clearCart}
                        currentName={this.state.currentName}
                        currentId={this.state.currentId}
                        showCart={this.showCart()}
                        selectedNames={this.state.cart.selectedNames}
                        count={this.state.count}
                        isActiveOverCart={this.state.isActiveOverCart}
                        activeStateCart={this.state.activeStateCart}
                        activeStateOverCart={this.state.activeStateOverCart}
                    />
                    : <Category
                        showCart={this.showCart()}
                        isActives={this.state.isActives}
                        active={this.state.active}
                        changeCategory={this.changeCategory}
                        showData={this.showData()}
                        onclick={this.onclick}
                        showAllCategories={this.showAllCategories()}
                        state={this.state}
                        filterProduct={this.filterProduct()}
                    />
                }
            </>
        )
    }
}

export default graphql(queryCategory)(App)
