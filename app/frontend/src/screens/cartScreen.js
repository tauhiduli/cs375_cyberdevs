import React, { useEffect } from 'react'
import {putItemIn, takeItemOut} from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

function getTotalNumberOfItems(array){
    let res=0
    for (let i=0;i<array.length;i++){
        let cur = array[i]
        res += cur['qty']
    }
    return res
}

function getTotalPrice(array){
    let res=0
    for (let i=0;i<array.length;i++){
        let cur = array[i]
        res += (cur['qty'] * cur['price'])
    }
    return res
}

function CartScreen(props){
    const cart = useSelector(state => state.cart);
    const products = cart['cartItems']
    const URL = "/"
    console.log(products)
    const item_number = props.match.params.id;
    let num
    if (props.location.search){
        num = props.location.search.split("=")
        num = num[1]
        num=Number(num)
    }else{
        num = 1
    }
    const numOfItems=num
    const d=useDispatch()
    const u=useEffect;

    
    const takeItemOutHandler = (item_number) => {
        d(takeItemOut(item_number))
    }
    u(()=>{
        if(item_number){
            d(putItemIn(item_number,numOfItems))
        }
    },[])

    const checkoutHandler = () => {
        let x = props.history
        x.push(URL)
    }

    return (
        <div id="basket">
            <div id="basket-items">
                <ul id="basket-wrapper">
                    <li>
                        <h3>
                            Shopping Cart
                        </h3>
                        <div>
                            Price
                        </div>
                    </li>
                    {
                        products.length === 0 ? 
                        <div>
                            Cart is empty
                        </div> 
                        :
                        products.map( function(product){
                            return (
                            <li>
                                <div className="cart-image">
                                    <img src={product.image} alt="product"/>
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to={"/product/"+product.product}>
                                            {product.name}
                                        </Link>
                                    </div>
                                    <div>
                                        Qty:
                                        <select value={product.qty} onChange={(e) => d(putItemIn(product.product,e.target.value))}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                        <button className="button cart-delete-button" type="button" onClick={() => takeItemOutHandler(product.product)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    ${product.price}
                                </div>
                            </li>
                            )}
                        )
                    }
                </ul>
            </div>
            <div id="basket-perform">
                <h3>
                    Subtotal ( {getTotalNumberOfItems(products)} items )
                    :
                     $ {getTotalPrice(products)}
                </h3>
                <button onClick={checkoutHandler} className="button primary full-width" disabled={products.length === 0}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default CartScreen;