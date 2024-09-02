import { useState } from 'react';

import classes from './Search.module.scss'
import { Container, Divider, Grid, GridColumn, Icon, Label, Search } from 'semantic-ui-react';

import { useGetStarWarsCategoriesQuery } from '../../../../slices/starWarsApiSlice';
import { Results } from '../Results/Results';


interface ISearchProps { }

export const SearchComp: React.FC<ISearchProps> = () => {

  const [searchTerm, setSearchTerm] = useState<string>('')

  const { data: categoriesData, error: categoriesError, isLoading: isCategoriesLoading, isSuccess: isCategoriesSuccess } = useGetStarWarsCategoriesQuery();

  const onSearchTermChanged = (value: string) => setSearchTerm(value);

  if (categoriesError) {
    return (
      <div>
        <Icon name='cancel' /> There was an error fetching the categories.
      </div>
    )
  }

  if (isCategoriesLoading) {
    //TODO: Consider adding a spinner here
    return (
      <div>
        <Icon loading name='certificate' /> Fetching Categories...
      </div>
    )
  }

  if (isCategoriesSuccess) {
    return (
      <Container className={classes.searchContainer}>
        {/* <Label> */}


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
        {/* </Label> */}
        <Divider horizontal />
        <Results
          searchTerm={searchTerm}
          categories={categoriesData}
        />
      </Container>


    )
  }

  return null
}
