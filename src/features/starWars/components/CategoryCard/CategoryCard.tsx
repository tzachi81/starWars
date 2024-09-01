import React from 'react'
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
    Button,
    List,
    SemanticICONS
} from 'semantic-ui-react'

import CategoryList from './CategoryList';
import classes from './CategoryCard.module.scss';

interface IResultsProps {
    title: string,
    data: any[]
}


export const CategoryCard: React.FC<IResultsProps> = ({ title, data }) => {

    return (
        <Card className={classes.categoryCard}>
            <CardContent>
                <CardHeader>
                    {title}
                </CardHeader>
            </CardContent>
            <CardContent>
                <CategoryList items={data} />
            </CardContent>
            <CardContent>
                <Button content onClick={() => console.log(`Go to ${title} page`)}>View All</Button>
            </CardContent>

        </Card>
    )
}

export default CategoryCard