import { useState } from "react";
import { Link  , useNavigate} from "react-router-dom";

const Login = ()=>{
    const [data , setData] = useState({email:"" , password:""})
    let navigate = useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response =await fetch("http://localhost:5000/api/login" , {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:data.email , password:data.password})
        })
        const json =await response.json();
        console.log(json);
        if(!json.sucess){
            alert("enter email is not exist");
        }
        if(json.sucess){
            localStorage.setItem("userEmail" ,data.email  )
            localStorage.setItem("authToken" , JSON.stringify(json.authToken));
            navigate('/')
        }
    }
    const onChange=(e)=>{
        setData({...data , [e.target.name]:e.target.value});
    }
    return(
        <div className="container m-3">
             <form onSubmit={handleSubmit} className="m-2">
                    <div className="mb-4">
                        <label htmlFor="Name">E-mail</label>
                        <input type="text" className="form-control" placeholder="Enter e-mail" name="email" value={data.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" placeholder="password"name="password" value={data.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                    <Link to='/SignUp' className="m-3 btn btn-danger">i 'm not a user</Link>
                    </form>
        </div>
    )
}
export default Login;