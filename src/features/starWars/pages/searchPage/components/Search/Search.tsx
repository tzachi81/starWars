import { useState } from 'react';

import classes from './Search.module.scss';

import { Container, Divider, Grid, GridColumn, Header, Icon, Search } from 'semantic-ui-react';

import { useGetStarWarsCategoriesQuery } from '../../../../slices/starWarsApiSlice';
import { Results } from '../Results/Results';
import { Logo } from '../../../../../../app/components/Logo';
import { mainLogo } from '../../../../../../assets/logo';


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
    return (
      <div>
        <Icon loading name='certificate' /> Fetching Categories...
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
          <Header
            content={
              <>
                <p>Data Search</p>
                <p>powered by: <a href={'https://swapi.dev/'} target='_blank' rel='noopener noreferrer'>SWAPI -
                The Star Wars API</a></p>
              </>
            }
            sub={true} 
            as='h3' 
            color='yellow'
          />

          <Grid>
            <GridColumn >
              <Search
                loading={isCategoriesLoading}
                showNoResults={false}
                placeholder='Search...'
                onSearchChange={(event) => onSearchTermChanged((event.target as HTMLInputElement).value)}
                value={searchTerm}
              />
            </GridColumn>
          </Grid>

          <Divider horizontal />

          <Results
            searchTerm={searchTerm}
            categories={categoriesData}
          />

        </Container>
      </div>

    )
  }

  return null
}
