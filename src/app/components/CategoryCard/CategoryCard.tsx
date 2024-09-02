import React from 'react';

import '../../../theme/sw-theme.module.scss';

import {
    CardHeader,
    CardContent,
    Card,
    Button
} from 'semantic-ui-react'

import { CategoryCardList } from '../CategoryCardList'



interface IResultsProps {
    title: string,
    data: any[]
}


export const CategoryCard: React.FC<IResultsProps> = ({ title, data }) => {

    return (
        <Card style={{ backgroundColor: '#0B1838'}}>
            <CardContent textAlign='left'>
                <CardHeader style={{ color: '#e1b61d' }} textAlign='center'>
                    {title.toUpperCase()}
                </CardHeader>
                <CategoryCardList items={data} />
            </CardContent>
            <CardContent textAlign='center' extra>                
                <Button style={{ border: '2px solid #e1b61d', backgroundColor: '#173278', color: '#e1b61d' }} disabled={title !== 'people'} content onClick={() => console.log(`Go to ${title} page`)}>View All</Button>
            </CardContent>
        </Card>
    )
}

export default CategoryCard;