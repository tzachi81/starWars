import React from 'react'
import {
    CardHeader,
    CardContent,
    Card,
    Button,
} from 'semantic-ui-react'

import CategoryList from './CategoryCardList';



interface IResultsProps {
    title: string,
    data: any[]
}


export const CategoryCard: React.FC<IResultsProps> = ({ title, data }) => {

    return (
        <Card>
            <CardContent textAlign='left'>
                <CardHeader textAlign='center'>
                    {title.toUpperCase()}
                </CardHeader>
                <CategoryList items={data} />
            </CardContent>
            <CardContent textAlign='center' extra>
                <Button color='black' disabled={title !== 'people'} content onClick={() => console.log(`Go to ${title} page`)}>View All</Button>
            </CardContent>

        </Card>
    )
}

export default CategoryCard