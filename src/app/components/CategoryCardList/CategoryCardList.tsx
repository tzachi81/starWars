import React from 'react'
import {
    List,
    ListItem
} from 'semantic-ui-react'

import classes from './CategoryCardList.module.scss';


interface ICategoryListProps {
    items: any[]
}

export const CategoryCardList: React.FC<ICategoryListProps> = ({ items }) => {

    return (
        <List className={classes.categoryList}>
            {items.map((result: any) => <ListItem style={{color: '#e1de84'}} key={result.name}>{result.name || result.title}</ListItem>)}
        </List>
    )
}

export default CategoryCardList