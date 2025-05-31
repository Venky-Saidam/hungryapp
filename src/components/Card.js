import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "../components/ContextReducer.js";

export default function Card(props) {
    const dispatch = useDispatchCart();
    const data = useCart();
    const priceRef = useRef();
    const options = props.options;
    const priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const [clicked, setClicked] = useState(false); // NEW

    const handleAddToCart = async () => {
        let food;

        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }

        const finalPrice = qty * parseInt(options[size]);

        if (food !== undefined) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
            } else {
                await dispatch({
                    type: "ADD",
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    price: finalPrice,
                    qty: qty,
                    size: size,
                    img: props.foodItem.img,
                });
            }
        } else {
            await dispatch({
                type: "ADD",
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                qty: qty,
                size: size,
                img: props.foodItem.img,
            });
        }

        // Trigger feedback
        setClicked(true);
        setTimeout(() => setClicked(false), 500); // revert after 500ms
    };

    useEffect(() => {
        setSize(priceOptions[0]); // Initialize size
    }, []);

    const finalPrice = qty * parseInt(options[size]);

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ width: "17rem", maxHeight: "490px" }}>
                    <img
                        src={props.foodItem.img}
                        className="card-img-top"
                        alt="..."
                        style={{ height: "180px", objectFit: "fill" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <p className="card-text">{props.foodItem.description}</p>

                        <div className="container w-100">
                            <select
                                className="m-2 h-100 bg-warning rounded"
                                onChange={(e) => setQty(parseInt(e.target.value))}
                            >
                                {Array.from(Array(6), (e, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        Items:  {i + 1}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="m-2 h-100 bg-warning rounded"
                                ref={priceRef}
                                onChange={(e) => setSize(e.target.value)}
                                value={size}
                            >
                                {priceOptions.map((data) => (
                                    <option key={data} value={data}>
                                        {data}
                                    </option>
                                ))}
                            </select>

                            <div className="d-inline h-100 fs-5">₹{finalPrice}</div>
                        </div>
                        <hr />
                        <button
                            className="btn text-white justify-content ms-2 fw-bold"
                            onClick={handleAddToCart}
                            style={{
                                backgroundColor: clicked ? "#155724" : "#28a745",
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
