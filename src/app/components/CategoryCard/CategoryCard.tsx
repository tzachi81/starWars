import React, { forwardRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import theme from '../../../theme/sw-theme.module.scss';

import '../../../theme/sw-theme.module.scss';

import {
    CardHeader,
    CardContent,
    Card,
    Button
} from 'semantic-ui-react'

import { CategoryCardList } from '../CategoryCardList'
import { useAppDispatch } from '../../hooks';
import { updateData, updateTitle } from '../../../features/starWars/slices/editorSlice';



interface IResultsProps {
    title: string,
    data: any
}


export const CategoryCard: React.FC<IResultsProps> = (props, ref) => {

    const appDispatch = useAppDispatch();

    //limits initial results number
    const resultsPerCategory = 3;

    const { title, data } = props;

    const firstXResults = data.results.slice(0, resultsPerCategory);

    const navigate = useNavigate();


    const onCardButtonClicked = useCallback(() => {
        appDispatch(updateData(data));
        appDispatch(updateTitle(title));
        
        navigate(`/category/${title}`, { state: { title, data } })
    }, [title]);

    return (
        <Card
            color='yellow'
            raised
            style={{ backgroundColor: '#161F38', borderColor: 'none', color: '#e1b61d' }}
        >
            <CardContent textAlign='left'>
                <CardHeader style={{ color: '#e1b61d' }} textAlign='center'>
                    {title.toUpperCase()}
                </CardHeader>
                <CategoryCardList items={firstXResults} />
            </CardContent>
            <CardContent textAlign='center' extra>

                <Button
                className={theme.button}
                    compact
                    size='tiny'
                    content='View All'

                    onClick={onCardButtonClicked}
                />
            </CardContent>
        </Card>
    )
};

export default CategoryCard;