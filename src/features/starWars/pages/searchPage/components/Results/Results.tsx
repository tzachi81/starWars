// import styles from './Results.module.css';
import { ICategories, useGetStarWarsDataQuery } from '../../../../slices/starWarsApiSlice';
import { resultsUtils } from './resultsUtils';
import { CategoryCard } from '../../../../../../app/components/CategoryCard/CategoryCard';
import { CardGroup, Container, Divider, Header, Icon, Segment } from 'semantic-ui-react';

import classes from './Results.module.scss';

interface IResultsProps {
    searchTerm: string,
    categories: ICategories
}

export const Results: React.FC<IResultsProps> = ({ categories, searchTerm }) => {

    const { data: searchResults, error: searchError, isLoading: isSearchLoading, isSuccess: isSearchSuccess, isFetching: isSearchFetching } = useGetStarWarsDataQuery({ categories, searchTerm });

    const currentCategorytitles = Object.keys(categories).join(', ');

    if (searchError) {
        return (
            <p><Icon name='cancel'></Icon>There was an error.</p>
        )
    }

    if (isSearchFetching) {
        return (
            <p><Icon loading name='spinner' />Getting results...</p>
        )
    }

    if (isSearchSuccess) {
        return (
            searchResults && searchResults.length > 0 &&
            <Segment basic loading={isSearchLoading} size='big'>
                <CardGroup
                    centered
                    stackable
                    className={classes.cardGroup}>
                    {searchResults.map((categoryResults: any, index: number) => {
                        if (categoryResults.count > 0) {

                            const categoryName: string = resultsUtils.reduceCategoryNames(categoryResults.results[0].url);

                            return <CategoryCard key={index} title={categoryName} data={categoryResults} />
                        }
                    })}
                </CardGroup>
            </Segment>

        )
    }

    return null
}
