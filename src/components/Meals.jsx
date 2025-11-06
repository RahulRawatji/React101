import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

const requestHeader = {}

export default function Meals(){
    
    const {data:mealsData, isLoading, error} = useHttp("https://solid-zebra-67qvj97pqvp3xxrv-3001.app.github.dev/meals",requestHeader,[])

    if(isLoading){
        return <p className="center">Loading</p>
    }

    if(error){
        return <Error title="Failed to fetch" message={error}/>
    }
    return <ul id='meals'>
        {mealsData?.map(meal=><MealItem key={meal.id} meal={meal}/>)}
    </ul>
}