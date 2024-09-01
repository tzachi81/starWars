import { useState } from 'react';
import { useGetStarWarsCategoriesQuery } from '../../slices/starWarsApiSlice';
import { Results } from '../Results/Results';
import { Container, Divider, Grid, GridColumn, Header, Search, Segment } from 'semantic-ui-react';


interface ISearchProps { }

export const SearchComp: React.FC<ISearchProps> = () => {

  const [searchTerm, setSearchTerm] = useState<string>('')

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
      <>

        <Grid>
          <GridColumn >
            <Search
              loading={isCategoriesLoading}
              showNoResults={false}
              placeholder='Search...'
              onSearchChange={(event) => onSearchTermChanged((event.target as HTMLInputElement).value)}
              results={Results}
              value={searchTerm}
            />
          </GridColumn>
        </Grid>
        <Divider horizontal />
        <Results
          searchTerm={searchTerm}
          categories={categoriesData}
        />
      </>


    )
  }

  return null
}
