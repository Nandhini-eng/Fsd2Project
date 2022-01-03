import * as ActionTypes from './ActionTypes';

export const cartReducer=(state={cart:[],items:null,currentItem:null},action)=>{
    switch(action.type){
        case ActionTypes.GET_PRODUCTS:
            return{...state,items:action.payload};
            
        case ActionTypes.ADD_TO_CART:
            const item=state.items.find((item)=>item.id===action.payload.id)
            const inCart=state.cart.find((item)=>item.id===action.payload.id ? true :false)
            // localStorage.setItem('cart',JSON.stringify(state.cart))
            return{
                ...state,
                cart:inCart?
                state.cart.map((item)=>item.id===action.payload.id? {...item,qty:item.qty+1}:item):
                [...state.cart,{...item,qty:1}],
            };
           

        case ActionTypes.REMOVE_FROM_CART:
            return{
                ...state,
                cart:state.cart.filter((item)=>item.id!==action.payload.id),
            };
            
        case ActionTypes.ADJUST_QTY:
            return{
                ...state,
                cart:state.cart.map((item)=>item.id===action.payload.id?{...item,qty: +action.payload.qty}:item)
            };
        case ActionTypes.LOAD_CURRENT_ITEM:
            return{
                ...state,
                currentItem:action.payload,
            };
        case ActionTypes.CART_EMPTY:
            return{
                ...state,
                cart:[]
            }    
        default:
            return state;              

    }
}


