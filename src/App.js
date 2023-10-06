import * as React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./allroutes";
import { CartProvider } from "./component/contextReducer";
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </CartProvider>
  );
}
export default App;
