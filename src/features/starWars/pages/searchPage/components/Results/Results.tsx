import {
  ICategories,
  useGetStarWarsDataQuery,
} from "../../../../slices/starWarsApiSlice"
import { CategoryCard } from "../../../../../../app/components/CategoryCard/CategoryCard"
import {
  CardGroup,
  Icon,
} from "semantic-ui-react"

import classes from "./Results.module.scss"

interface IResultsProps {
  categories: ICategories
}

export const Results: React.FC<IResultsProps> = ({
  categories,
}) => {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetStarWarsDataQuery({ categories })

  const currentCategorytitles: string[] = Object.keys(categories)

  if (isError) {
    return (
      <p>
        <Icon name="cancel"></Icon>There was an error.
      </p>
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
      <p>
        <Icon loading name="spinner" />
        Getting results...
      </p>
    )
  }

  if (isSuccess && data?.length > 0) {
    return (
      <CardGroup centered stackable className={classes.cardGroup}>
        {data.map((categoryResults: any, index: number) => {
          return (
            <CategoryCard
              key={index}
              title={currentCategorytitles[index]}
              data={categoryResults}
            />
          )
        })}
      </CardGroup>
    )
  }

  return null
}
