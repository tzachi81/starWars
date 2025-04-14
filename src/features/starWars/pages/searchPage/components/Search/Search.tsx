import { useState } from "react"

import classes from "./Search.module.scss"

import {
  Container,
  Divider,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Icon,
  Search,
  Segment,
} from "semantic-ui-react"

import { useGetStarWarsCategoriesQuery } from "../../../../slices/starWarsApiSlice"
import { Results } from "../Results/Results"
import { Logo } from "../../../../../../app/components/Logo"
import { mainLogo } from "../../../../../../assets/logo"

interface ISearchProps {}

export const SearchComp: React.FC<ISearchProps> = () => {
  // const [searchTerm, setSearchTerm] = useState<string>("")

  const { data, isError, isLoading, isFetching } =
    useGetStarWarsCategoriesQuery({})

  // const onSearchTermChanged = (value: string) => setSearchTerm(value)

  if (isError) {
    return (
      <div className={classes.searchContainer}>
        <Icon name="cancel" /> There was an error fetching the categories.
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={classes.searchContainer}>
        <Icon loading name="spinner" /> Loading search...
      </div>
    )
  }

  if (isFetching) {
    return (
      <div className={classes.searchContainer}>
        <Icon loading name="spinner" /> Fetching Categories...
      </div>
    )
  }

  if (data) {
    return (
      <div className={classes.searchContainer}>
        <Container textAlign="center" fluid>
          <Logo imageUrl={mainLogo} />
          <Header
            sub={true}
            as="h3"
            color="yellow"
            content={
              <>
                <p>Star Wars data</p>
                <p>
                  Powered by:{" "}
                  <a
                    href={"https://swapi.info/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SWAPI - The Star Wars API
                  </a>
                </p>
              </>
            }
          />

          <Container>
            <Grid divided centered>
              <GridRow>
                <Results categories={data} />
              </GridRow>
            </Grid>
          </Container>
        </Container>
      </div>
    )
  }

  return null
}
