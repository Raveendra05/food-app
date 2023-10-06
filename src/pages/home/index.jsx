import { useEffect, useState } from "react";
import Card from "../../component/card";
// import { CardData } from "../../component/cardData";
// import Caresoul from "../../component/caresoul";
import MainLayout from "../../layout/main-layout";
const Home = () => {
    const [foodItem, setFoodItem] = useState([]);
    const [foodCategory, setFoodCategory] = useState([]);
    const [search ,setSearch] =useState("");

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/allData", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }
        });

        response = await response.json();
        // console.log(response[0],response[1]);
        setFoodItem(response[0])
        setFoodCategory(response[1])
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <MainLayout>
            <div>
                <div className="fluid-container ">
                    <div id="carouselExampleFade" className="carousel slide carousel-fade">
                        <div className="carousel-inner" id="carousel" >
                            <div className="carousel-caption" style={{ zIndex: "5" }}>
                                <div className="d-flex justify-content-center ">
                                    <input class="form-control mr-sm-2 bg-dark text-white me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                                    {/* <button class="btn btn-outline-success text-white bg-success ml-2" type="submit">Search</button> */}
                                </div>
                            </div>
                            <div className="carousel-item active" style={{ height:"400px",objectFit:"fill"}}>
                                <img src="https://source.unsplash.com/random/300×300?burger" className="d-block w-100 h-100" style={{ filter: "brightness(40%)" }} alt="no" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/random/300×300?pizza" className="d-block w-100 h-100" style={{ filter: "brightness(40%)" }} alt="no" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://source.unsplash.com/random/300×300?cheese" className="d-block w-100 h-100" style={{ filter: "brightness(40%)" }} alt="no" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="fluid-container m-2">
                {
                    foodCategory !== []
                        ?
                        foodCategory.map((data) => {
                            return (
                                <div className="row mb-1">
                                    <div key={data._id} className="fs-3 m-1">
                                        {
                                            data.category_name
                                        }
                                    </div>
                                    <hr />
                                    {
                                       foodItem !== []
                                            ?
                                            foodItem.filter((item) => (item.category_name === data.category_name)&& item.name.toLowerCase().includes(search.toLocaleLowerCase())).map((filteredItem) => {
                                                return (
                                                    <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3 col-xl-2 m-5" >
                                                        <Card foodItem={filteredItem}
                                                            option={filteredItem.options[0]}
                                                        />
                                                    </div>
                                                )
                                            }) : ""
                                    }
                                </div>
                            )
                        }) :
                        <div>
                            no such data
                        </div>
                }
            </div>
        </MainLayout>
    )
}
export default Home;