import { ReactElement, ReactEventHandler, ReactHTMLElement, useState } from 'react'
import styles from './Search.module.css';
import { useGetStarWarsCategoriesQuery, useGetStarWarsDataQuery } from '../../slices/starWarsApiSlice';
import { Results } from '../Results/Results';


interface ISearchProps { }

export const Search: React.FC<ISearchProps> = () => {

  const [searchTerm, setSearchTerm] = useState<string>('')
  
  // The useGetStarWarsCategoriesQuery hook automatically fetches the available categories from the StarWars API.
  const { data: categoriesData, error: categoriesError, isLoading: isCategoriesLoading, isSuccess: isCategoriesSuccess } = useGetStarWarsCategoriesQuery();

  const onSearchTermChanged = (value: string) => setSearchTerm(value);

  if (categoriesError) {
    return (
      <div>
        <h1>There was an error.</h1>
      </div>
    )
  }

  if (isCategoriesLoading) {
    //TODO: Consider adding a spinner here
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (isCategoriesSuccess) {
    return (
      <div className={styles.container}>
        <h3>Search in StarWars Data</h3>
        <span>Search:
          <input
            type='text'
            name='searchTerm'
            value={searchTerm}
            onChange={(event) => onSearchTermChanged(event.target.value)}>
          </input>
        </span>

        <Results
          searchTerm={searchTerm}
          categories={categoriesData}
        />
      </div>
    )
  }

  return null
}
