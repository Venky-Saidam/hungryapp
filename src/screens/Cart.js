import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = process.env.REACT_APP_API_URL;


export default function Cart() {
    let data = useCart() || [];
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                <div
                    className="text-center fs-3"
                    style={{
                        color: "#dc3545",
                        backgroundColor: "#f8d7da",
                        padding: "1rem 2rem",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        maxWidth: "400px",
                        width: "100%",
                        wordWrap: "break-word"
                    }}
                >
                    Cart is Empty!
                </div>
            </div>
        );
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch(`${API_URL}/api/OrderData`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log("Order Response ", response);
        if (response.status === 200) {
            dispatch({ type: "DROP" });
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price * food.qty, 0);

    return (
        <div style={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <div className="container m-auto mt-4 table-responsive">
                <table className="table table-hover" style={{ backgroundColor: "#fff", borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <thead style={{ backgroundColor: "#28a745", color: "#fff" }}>
                        <tr>
                            <th scope="col">S.no</th>
                            <th scope="col">Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Price</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index} style={{ verticalAlign: "middle", borderBottom: "1px solid #e0e0e0" }}>
                                <th scope="row">{index + 1}</th>
                                <td style={{ fontWeight: "500" }}>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>₹{food.price * food.qty}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn p-0"
                                        onClick={() => {
                                            dispatch({ type: "REMOVE", index: index });
                                        }}
                                        style={{
                                            color: "#dc3545",
                                            backgroundColor: "transparent",
                                            border: "none",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <DeleteIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="text-center mt-4" style={{
                    backgroundColor: "#ffffff",
                    padding: "1rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                }}>
                    <h2 className="fs-3" style={{ color: "#28a745" }}>Total Price: ₹{totalPrice}/-</h2>
                    <button
                        onClick={handleCheckOut}
                        className="btn mt-3"
                        style={{
                            backgroundColor: "#28a745",
                            color: "#fff",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            border: "none",
                            transition: "background-color 0.3s",
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
                    >
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    );
}
