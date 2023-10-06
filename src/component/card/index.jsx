import { CartDispatchProvider } from '../contextReducer';
import { useContext, useEffect, useRef, useState } from "react";
const Card = (props) => {
    let options = props.option;
    let priceOptions = Object.keys(options);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const { dispatch, state } = useContext(CartDispatchProvider);
    const priceref = useRef();
    const handleAddToCart = async () => {
        let food = [];
        for (const item of state) {
            if (item.id === props.foodItem._id) {
                food = item
                break;
            }
        }
        if (!food == []) {
            if (food.size === size) {
                await dispatch({
                    type: "UPDATE", id: props.foodItem._id, price: finalPrice, quantity: quantity
                })
                return
            }
            else if (food.size !== size) {
                await dispatch({
                    type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, quantity: quantity, size: size, img: props.img
                })
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, size: size, quantity: quantity, img: props.img })
    }
    let finalPrice = quantity * parseInt(options[size]);

    useEffect(() => {
        setSize(priceref.current.value)
    }, [])
    return (
        <div>
            <div className="card" style={{ width: "18rem", minHeight: "300px" }}>
                <img className="card-img-top image-circle" src={props.foodItem.img} alt="Card  cap" style={{ height: "180px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="fluid-container w-100">
                        <select className="bg-success rounded  m-2 h-100" onChange={(e) => setQuantity(e.target.value)}>
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })
                            }
                        </select>
                        <select className="h-100 bg-success rounded m-2" ref={priceref} onChange={(e) => setSize(e.target.value)}>
                            {
                                priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })
                            }
                        </select>
                        <div className="d-inline fs-5">Price:₹{finalPrice}</div>
                    </div>
                    <hr />
                    <button className="btn btn-danger justify-center ms-2" onClick={handleAddToCart}>
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>


    )
}
export default Card;