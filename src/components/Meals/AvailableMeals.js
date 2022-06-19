
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useState, useEffect } from 'react';


const AvailableMeals = () => {
    const api = 'https://react-foodapp-880fa-default-rtdb.firebaseio.com/'
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(api + 'meals.json'
            );

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,

                });
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch((error) => {
            console.log(error);
            setIsLoading(false);
            setHttpError(error);
        });
    }, []);

    if (isLoading) {
        return (<section className={classes.MealsLoading}>
            <p>Loading...</p>
        </section>);
    }

    if (httpError) {
        console.log(httpError);

        return (<section className={classes.MealsErrors}>
            <p>{httpError.message}</p>
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