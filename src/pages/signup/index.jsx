import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const SignUp = () => {
    const [data, setData] = useState({ name: "", email: "", password: "", location: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: data.name, password: data.password, location: data.location, email: data.email })
        })
        const json = await response.json()
        console.log(json);
        if (!json.sucess) {
            alert("enter valid data");
        }
        navigate('/');
    }
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const navigate = useNavigate()
    return (
        <>
            <div className="container m-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Name">Name</label>
                        <input type="text" className="form-control" placeholder="Enter name" name="name" value={data.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1">E-mail</label>
                        <input type="e-mail" className="form-control" placeholder="E-mail"name="email" value={data.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" placeholder="Password"name="password" value={data.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location">Location</label>
                        <input type="text" className="form-control" placeholder="location" name="location" value={data.location} onChange={onChange} />
                    </div>

                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                    <Link to='/login' className="m-3 btn btn-danger">Already register</Link>
                </form>
            </div>
        </>
    )
}
export default SignUp;