import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { resultsUtils } from "../../../searchPage/components/Results/resultsUtils"

import classes from "./CategoryPage.module.scss"

import theme from "../../../../../../theme/sw-theme.module.scss"

import { Button, Container } from "semantic-ui-react"

import { CategoryTable } from "../categoryTable/categoryTable"
import { useAppDispatch } from "../../../../../../app/hooks"
import { ICategories } from "../../../../slices/starWarsApiSlice"

export interface ICategoryPageProps {}

export const CategoryPage: React.FC<ICategoryPageProps> = () => {

  const navigate = useNavigate()

  const location = useLocation()

  const { title, data } = location.state as { title?: string; data?: ICategories } || {};

  const reducedToBasicDetails = resultsUtils.reduceToBasicDetails(data);

  
    if(data && title) return (<Container fluid className={classes.categoryPage}>
      <Button
        floated="right"
        className={theme.button}
        icon="left arrow"
        compact
        size="tiny"
        style={{ backgroundColor: "#173278", color: "#e1b61d" }}
        onClick={() => navigate(-1)}
        content="Back to search"
      />
      <h1>{title.toUpperCase()}</h1>

      <CategoryTable data={reducedToBasicDetails} />
    </Container>
  )
}
