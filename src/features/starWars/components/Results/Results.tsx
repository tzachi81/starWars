import styles from './Results.module.css';
import { ICategories, useGetStarWarsDataQuery } from '../../slices/starWarsApiSlice';
import { resultsUtils } from './resultsUtils';
import { CategoryCard } from '../CategoryCard/CategoryCard';

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
            <div>
                <h1>There was an error.</h1>
            </div>
        )
    }

    if (isSearchLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    // ${Object.keys(categories).map((category, index) => <span key={`${index}${category}`}>{category}&nbsp;</span>)}`
    if (isSearchSuccess) {
        return (
            searchResults && searchResults.length > 0 &&
            <div className={styles.container}>
                <h3>{`Searching "${searchTerm}" in ${currentCategorytitles}` }</h3>
                <ul>
                    {searchResults.map((categoryResults, index) => {
                        if (categoryResults.count > 0) {

                            const results = categoryResults.results.slice(0, resultsPerCategory);
                            const categoryName: string = resultsUtils.reduceCategoryNames(results[0].url);

                            return <CategoryCard key={index} title={categoryName} data={results} />
                        }
                    })}
                </ul>
            </div>
        )
    }

    return null
}
