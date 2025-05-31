import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


const API_URL = process.env.REACT_APP_API_URL;


export default function MyOrder() {
    const [groupedOrders, setGroupedOrders] = useState({});

    const fetchMyOrder = async () => {
        try {
            const response = await fetch(`${API_URL}/api/myOrderData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            const data = await response.json();
            console.log("Fetched order data:", data);

            const grouped = {};

            data.orderData.forEach(order => {
                const { order_date, order_data } = order;
                if (!grouped[order_date]) {
                    grouped[order_date] = [];
                }
                grouped[order_date].push(...order_data);  // Spread to flatten items
            });

            setGroupedOrders(grouped);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                {Object.keys(groupedOrders).length === 0 ? (
                    <div>No orders found.</div>
                ) : (
                    Object.entries(groupedOrders).map(([date, items]) => (
                        <div key={date}>
                            <h4 className='mt-4 mb-3'>{date}</h4>
                            <div className='row'>
                                {items.map((item, index) => (
                                    <div key={index} className='col-12 col-md-6 col-lg-3'>
                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                            <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                    <span className='m-1'>{item.qty}</span>
                                                    <span className='m-1'>{item.size}</span>
                                                    <div className=' d-inline ms-2 h-100 w-20 fs-5'>
                                                        ₹{item.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </div>
    );
}
