import React, { forwardRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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
    data: any
}


export const CategoryCard: React.FC<IResultsProps> = forwardRef((props, ref) => {

    //limits initial results number
    const resultsPerCategory = 3;

    const { title, data } = props;

    const firstXResults = data.results.slice(0, resultsPerCategory);
    
    const navigate = useNavigate();


    const onCardButtonClicked = useCallback(() => {
        navigate(`/category/${title}`, { state: { title, data } })
    }, [ title]);

    return (
        <Card
            style={{ backgroundColor: '#161F38' }}>
            <CardContent textAlign='left'>
                <CardHeader style={{ color: '#e1b61d' }} textAlign='center'>
                    {title.toUpperCase()}
                </CardHeader>
                <CategoryCardList items={firstXResults} />
            </CardContent>
            <CardContent textAlign='center' extra>

                <Button
                    content='View All'
                    style={{ border: '2px solid #e1b61d', backgroundColor: '#173278', color: '#e1b61d' }} 
                    onClick={onCardButtonClicked}
                />
            </CardContent>
        </Card>
    )
});

export default CategoryCard;