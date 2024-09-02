import { useState } from 'react';

import classes from './Search.module.scss';

import { Container, Divider, Grid, GridColumn, GridRow, Header, Icon, Search, Segment } from 'semantic-ui-react';

import { useGetStarWarsCategoriesQuery } from '../../../../slices/starWarsApiSlice';
import { Results } from '../Results/Results';
import { Logo } from '../../../../../../app/components/Logo';
import { mainLogo } from '../../../../../../assets/logo';


interface ISearchProps { }

export const SearchComp: React.FC<ISearchProps> = () => {

  const [searchTerm, setSearchTerm] = useState<string>('')

  const { data: categoriesData, error: categoriesError, isLoading: isCategoriesLoading, isFetching: isCategoriesFetching, isSuccess: isCategoriesSuccess } = useGetStarWarsCategoriesQuery();

  const onSearchTermChanged = (value: string) => setSearchTerm(value);

  if (categoriesError) {
    return (
      <div className={classes.searchContainer}>
        <Icon name='cancel' /> There was an error fetching the categories.
      </div>
    )
  }

  if (isCategoriesLoading) {
    return (
      <div className={classes.searchContainer}>
        <Icon loading name='spinner' /> Loading search...
      </div>
    )
  }

  if (isCategoriesFetching) {
    return (
      <div className={classes.searchContainer}>
        <Icon loading name='spinner' /> Fetching Categories...
      </div>
    )
  }

  if (isCategoriesSuccess) {
    return (
      <div className={classes.searchContainer}>
        <Container

          textAlign='center'
          fluid >
          <Logo imageUrl={mainLogo} />
          <Header sub={true}
            as='h3'
            color='yellow'
            content={
              <p>Data Search</p>
            }
          />

          <Container>
            <Grid divided
              centered>
              <GridRow >
                <Search
                  loading={isCategoriesLoading}
                  showNoResults={false}
                  placeholder='Search...'
                  onSearchChange={(event) => onSearchTermChanged((event.target as HTMLInputElement).value)}
                  value={searchTerm}
                />
              </GridRow>
              <GridRow>
                <p>Powered by: <a href={'https://swapi.dev/'} target='_blank' rel='noopener noreferrer'>SWAPI -
                  The Star Wars API</a></p>
              </GridRow>
              <GridRow>

                <Results
                  searchTerm={searchTerm}
                  categories={categoriesData}
                />
              </GridRow>
            </Grid>
          </Container>


        </Container>
      </div>

    )
  }

  return null
}
