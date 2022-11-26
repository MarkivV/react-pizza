import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const PizzaDetails: React.FC = () => {
    const [pizzaData, setPizzaData] = useState({});
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza(){
            try {
                axios.get('https://6366d213f5f549f052cd2835.mockapi.io/items/'+id).then((res)=>{
                    setPizzaData(res.data)
                })
            }catch(error){
                navigate("/")
            }

        }

        fetchPizza()
    }, []);


    if(!pizzaData){
        return <>Loading</>
    }

    return (
        <div>
            <img src={pizzaData.imageUrl} alt=""/>
            <h3>{pizzaData.title}</h3>
            <h3>{pizzaData.price}</h3>
        </div>
    );
};

export default PizzaDetails;
