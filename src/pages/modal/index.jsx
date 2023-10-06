import React from 'react';
// import Cart from '../../component/cart';

// const overlay_style = {
//     postion: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,9)',
//     zIndex: 1000
// }
// const modal_style = {
//     postion: "fixed",
//     top: "50%",
//     left: "50%",
//     backgroundColor: "rgba(35,35,35)",
//     transform: "translate(-50% , -50%)",
//     zIndex: 1000,
//     height: "90%",
//     width: "90%"
// }
export default function Modal({ onclose }) {
    return (
        <>
            <div  className='fluid-contanier '>
                <div className='container bg-dark w-100 h-100 text-light'>

                    <button className='btn bg-danger fs-4' onClick={onclose}>X</button>
                </div>
            </div>
        </>
    )
}
