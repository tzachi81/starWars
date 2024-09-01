import React from 'react'
import {
    List,
    ListItem
} from 'semantic-ui-react'


interface ICategoryListProps {
    items: any[]
}

export const CategoryList: React.FC<ICategoryListProps> = ({ items }) => {

    return (
        <List>
            {items.map((result: any) => <ListItem key={result.name}>{result.name || result.title}</ListItem>)}
        </List>
    )
}

export default CategoryList