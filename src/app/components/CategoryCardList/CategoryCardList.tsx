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
        <List 
        floated='left'
        className={classes.categoryList}>
            {items.map((result: any, index) => (
                <ListItem
                    key={`${result.name}_${index}`}
                    style={{ color: '#e1b61d' }}
                    content={result.name || result.title}
                />
            )
            )}
        </List>
    )
}

export default CategoryCardList