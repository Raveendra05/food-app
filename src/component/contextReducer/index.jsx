import React, { createContext, useReducer } from 'react'

// const CartStateProvider = createContext();
export const CartDispatchProvider = createContext();

const initialState = [];
const Reducer = (state, action) => {

    switch(action.type){
        case "ADD":{
            
            return [...state , {id:action.id , name:action.name , img:action.img , size:action.size , price:action.price , quantity:action.quantity}]
        }
        case "DELETE":{
            const newArr = [...state];
            newArr.splice(action.index , 1);
            return newArr;
        }
        case "UPDATE":{
            let arr = [...state];
            arr.find((food , index)=>{
                if(food.id === action.id){
                    arr[index] = {...food , quantity:parseInt(action.quantity) , price:action.price }
                }
                return arr;
            })
            return arr;
        }
        case "DROP":{
            let emptyArr = [];
            return emptyArr;
        }
            default:
                console.log("error in reducer");
    }
}
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState)
    console.log(state);

    return (
        <CartDispatchProvider.Provider value={{dispatch ,state}}>
            
                {children}
            
        </CartDispatchProvider.Provider>

    )
}
// export const UseCart = () => useContext(CartStateProvider);
// export const UseDispatchCart = () => useContext(CartDispatchProvider);