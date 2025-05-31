import React from "react";

export default function Carousal() {
  return (
    <div className="container my-4"> {/* Add some top/bottom spacing */}
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ maxHeight: "500px", overflow: "hidden", borderRadius: "12px" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-info text-white bg-warning"
                type="submit"
              >
                Search
              </button>
            </form>
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
              src="https://wallpapercave.com/wp/wp4692292.jpg"
              className="d-block w-100"
              style={{ filter: "brightness(30%)", objectFit: "cover", height: "500px" }}
              alt="Pizza"
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
  );
}
