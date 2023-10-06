import { Route , Routes } from "react-router-dom";
import Home from "../pages/home";
import SignUp from "../pages/signup";
import Login from "../pages/login";
import Cart from "../component/cart";
import MyOrder from "../pages/orderedData";
// import { CartProvider } from "../component/contextReducer";
// import MainLayout from "../layout/main-layout";

const AllRoutes=()=>{
    return(
            <Routes>
                {/* <Route path="/" element={<MainLayout/>}/> */}
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/myorder" element={<MyOrder/>}/>
                
            </Routes>
    )
}
export default AllRoutes;