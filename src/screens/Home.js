import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

const API_URL = process.env.REACT_APP_API_URL;



export default function Home() {

    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch(`${API_URL}/api/foodData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();

        setFoodItem(response[0]);
        setFoodCat(response[1]);
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div><Navbar /></div>
            <div className="container my-4">
                <div
                    id="carouselExampleControls"
                    className="carousel slide"
                    data-bs-ride="carousel"
                    style={{ maxHeight: "500px", overflow: "hidden", borderRadius: "12px" }}
                >
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value) }}
                                />
                            </div>
                        </div>

                        <div className="carousel-item active">
                            <img
                                src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL2Rlc2lnbndpdGhtZTA5X2FfYnVyZ2VyX2luX3RoZV9zdHlsZV9vZl9oeXBlci1yZWFsaXN0aWNfaWxsdXN0cl9jZDkwYmJiMi0wNDJkLTQ4ZmEtYTExMy1kY2UyNTY5MzA2MzZfMS5qcGc.jpg"
                                className="d-block w-100"
                                style={{ filter: "brightness(30%)", objectFit: "cover", height: "500px" }}
                                alt="Burger"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhWEwWfozDKGmqySOPdhysUBUJCBHRs9mpH3nEa5NBYVcl9ZiDyDg-9kLoVt38CT7d3aSNgKVal6HTqEKdIYiOZl0J3J7SAxSKiRlx1QMHxwSR2PO8i0KbeYxNFP_v5BD70k1zUqvDnJ9BH/s1600/Paneer_Tikka_5.jpg"
                                className="d-block w-100"
                                style={{ filter: "brightness(30%)", objectFit: "cover", height: "500px" }}
                                alt="Paneer"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://img.freepik.com/free-photo/sweet-pastry-assortment-top-view_23-2148516578.jpg"
                                className="d-block w-100"
                                style={{ filter: "brightness(30%)", objectFit: "cover", height: "500px" }}
                                alt="Pastry"
                            />
                        </div>
                    </div>

                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='container'>
                {
                    foodCat.length !== 0 &&
                    foodCat.map((data, index) => {
                        return (
                            <div className='row mb-3' key={index}>
                                <div className='fs-3 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {
                                    foodItem.length !== 0
                                        ? foodItem
                                            .filter((item) =>
                                                item.CategoryName === data.CategoryName &&
                                                item.name.toLowerCase().includes(search.toLowerCase())
                                            )
                                            .map(filterItem => {
                                                return (
                                                    <div className='col-12 col-md-6 col-lg-3' key={filterItem._id}>
                                                        <Card foodItem= {filterItem}
                                                            
                                                            options={filterItem.options[0]}
                                                            imgSrc={filterItem.img}
                                                        />
                                                    </div>
                                                )
                                            })
                                        : <div>No such Data Found</div>
                                }
                            </div>
                        );
                    })
                }
            </div>

            <div><Footer /></div>
        </div>
    )
}
