import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selecedCategory, setSelecedCategory] = useState("drinks");
  const categories = [
    {
      name: "Juices",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/430/430561.png",
    },
    {
      name: "Shakes",
      imageUrl: "https://img.icons8.com/?size=100&id=84304&format=png&color=000000",
    },
    {
      name: "Coffee",
      imageUrl: "https://img.icons8.com/?size=100&id=N3RgkSbpOEMx&format=png&color=000000",
    },
    {
      name: "Eatable",
      imageUrl: "https://img.icons8.com/?size=100&id=82486&format=png&color=000000",
    },
    {
      name: "Meal",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1471/1471262.png",
    },
  ];
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, [dispatch]);
  return (
    <DefaultLayout>
      <div className="d-flex" style={{
            width: "100vw",
            overflow: "scroll",
            padding: "10px"
      }}>
        {categories.map((category) => (
          <div
            key={category.name}
            className={`d-flex category ${
              selecedCategory === category.name && "category-active"
            }`}
            onClick={() => setSelecedCategory(category.name)}
            style={{
              flexDirection:'column',
              alignItems:'center'
            }}
          >
            <h6>{category.name}</h6>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="40"
              width="60"
            />
          </div>
        ))}
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        width:"100vw",
        gridColumnGap: "10px"
      }}>
        {itemsData
          .filter((i) => i.category === selecedCategory)
          .map((item) => (
            <div style={{width:"100%"}}>
              <ItemList key={item.id} item={item} />
            </div>
          ))}
      </div>
    </DefaultLayout>
  );
};

export default Homepage;
