import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals(){

    const [mealsData, setMealsData] = useState([]);

    useEffect(()=>{
        fetchMeals();
    },[])

    async function fetchMeals(){
        const response = await fetch("https://solid-zebra-67qvj97pqvp3xxrv-3001.app.github.dev/meals");
        if(!response.ok){
 
        }
        const meals = await response.json();
        setMealsData(meals)
     }

    if(mealsData.length == 0){
        return <div>Loading</div>
    }

    return <ul id='meals'>
        {mealsData?.map(meal=><MealItem key={meal.id} meal={meal}/>)}
    </ul>
}