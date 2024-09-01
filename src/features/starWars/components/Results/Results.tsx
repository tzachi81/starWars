// import styles from './Results.module.css';
import { ICategories, useGetStarWarsDataQuery } from '../../slices/starWarsApiSlice';
import { resultsUtils } from './resultsUtils';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { CardGroup, Container, Divider, Header, Icon, Segment } from 'semantic-ui-react';

import classes from './Results.module.scss';

interface IResultsProps {
    searchTerm: string,
    categories: ICategories
}

export const Results: React.FC<IResultsProps> = ({ categories, searchTerm }) => {

    const { data: searchResults, error: searchError, isLoading: isSearchLoading, isSuccess: isSearchSuccess } = useGetStarWarsDataQuery({ categories, searchTerm });

    const resultsPerCategory = 3;

    const currentCategorytitles = Object.keys(categories).join(', ');

    if (searchError) {
        return (
            <>
                <Icon name='cancel'></Icon>
                <h1>There was an error.</h1>
            </>
        )
    }

    if (isSearchLoading) {
        return (
            <>
                <Icon loading name='spinner' />
                <h1>Loading...</h1>
            </>
        )
    }

    if (isSearchSuccess) {
        return (
            searchResults && searchResults.length > 0 &&

            <CardGroup 
            centered 
            stackable
            className={classes.cardGroup}>
                {searchResults.map((categoryResults: any, index: number) => {
                    if (categoryResults.count > 0) {

                        const results = categoryResults.results.slice(0, resultsPerCategory);
                        const categoryName: string = resultsUtils.reduceCategoryNames(results[0].url);

                        return <CategoryCard key={index} title={categoryName} data={results} />
                    }
                })}
            </CardGroup>

        )
    }

    return null
}
