
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useState, useEffect } from 'react';


const AvailableMeals = () => {

    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://react-foodapp-880fa-default-rtdb.firebaseio.com/meals.json')
            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price

                })
            }
            setMeals(loadedMeals)
            setIsLoading(false)
        }

        fetchMeals()

    }, [])

    if (isLoading) {
        return (<section className={classes.MealsLoading}>
            <p>Loading...</p>
        </section>)
    }

    const mealsList = meals.map(meals => <MealItem
        key={meals.id}
        id={meals.id}
        name={meals.name}
        description={meals.description}
        price={meals.price}
    />);
    return (

        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;