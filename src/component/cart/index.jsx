import React, { useContext } from 'react'
import { CartDispatchProvider } from '../contextReducer'
import { useNavigate } from 'react-router-dom';
// import CreateIcon from '@mui/icons-material/Create';
export default function Cart() {
  let { state ,dispatch } = useContext(CartDispatchProvider)
  const navigate = useNavigate();
  // const {data} =props; 
  if (state.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>the cart is empty..!</div>
      </div>
    )
  }
  const handleCheckOut = async()=>{
    let userEmail = localStorage.getItem("userEmail");
    // console.log(userEmail);
    let response = await fetch("http://localhost:5000/api/orderdata" , {
      method:"POST" ,
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({
        email:userEmail,
        order_data:state,
        
        order_date:new Date().toDateString()
      })
    });
    if(response.status===200){
      dispatch({
        type:"DROP" , 
      })
    }
  }
  const close = () => {
    navigate("/");
  }
  const Total = state.reduce((tot , state)=>
    tot +state.price ,0
  )

  console.log("total" , Total);
  return (
    <div>
      <div className='container m-auto mt-4 table-responsive table-responsive-sm table-responsive-md'>
        <table class="table table-dark fs-4 table-hover">
          <thead className='fs-3'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col">delete</th>

            </tr>
          </thead>
          <tbody>
            {
              state.map((value, index) => (
                <tr key={index + 1}>
                  <th scope="row">{index + 1}</th>
                  <td>{value.name}</td>
                  <td>{value.quantity}</td>
                  <td>{value.size}</td>
                  <td>{value.price}</td>
                    <td>
                      <button onClick={()=>{dispatch ({ type:"DELETE" ,  index:index }) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg></button>
                    </td>
                </tr>
              ))
            }

          </tbody>
        </table>
        <div> <h2>Total Price:{Total}</h2></div>
        <div className='btn bg-dark text-light m-3' onClick={handleCheckOut}>
          Check Out
        </div>
        <div className='btn bg-dark text-light m-3' onClick={close}>
          close
        </div>
      </div>
    </div>
  )
}
