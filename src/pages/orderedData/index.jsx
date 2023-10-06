import React, { useEffect, useState } from 'react'
import MainLayout from '../../layout/main-layout'

export default function MyOrder() {
    const [orderData, setOrderData] = useState('');
    const fetchMyOrder = async()=>{
            await fetch("http://localhost:5000/api/myOrderData",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:localStorage.getItem("userEmail")
                })
                }).then(async(res)=>{
                    let response = await res.json()
                    // console.log(response);
                    setOrderData(response)
            })
    }
    useEffect(()=>{
        fetchMyOrder()
    },[])
    // console.log(orderData);
    return (
        <>
            <MainLayout>
                <div className="container">
                    <div className="row">
                        {
                            orderData !== {} ? Array(orderData).map(data => {
                                return (
                                    data.OrderData ?
                                        data.OrderData.OrderData.slice(0).reverse().map((item) => {
                                            return (
                                                item.map((arrayData) => {
                                                    return (
                                                        <div>
                                                            {arrayData.Order_date ? <div className='m-auto mt-5'>
                                                                {data = arrayData.Order_date}
                                                                <hr />
                                                            </div> :

                                                                <div className="col-12 col-md-6 col-lg-3">
                                                                    <div className="card mt-3" style={{
                                                                        width: "15rem", maxHeight: "350px"
                                                                    }}>
                                                                        <div className="card-body">
                                                                            <h5 className="card-title">{arrayData.name}</h5>
                                                                            <div className="container w-100 p-0" style={{ height: "40px" }}>
                                                                                <span className="m-1">{arrayData.quantity}</span>
                                                                                <span className="m-1">{arrayData.size}</span>
                                                                                <span className="m-1">{data}</span>
                                                                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                                                    ₹{arrayData.price}/-
                                                                                </div>
                                                                            </div>                                                           </div>

                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                })
                                            )
                                        }):"no such data.."
                            )
                            }):"------/-----"
                    }
                    </div>
                </div>
            </MainLayout>
        </>
    )
}
