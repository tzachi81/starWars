import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resultsUtils } from '../../../searchPage/components/Results/resultsUtils';

import classes from './CategoryPage.module.scss';

import theme from '../../../../../../theme/sw-theme.module.scss';

import {
    Button,
    Container
} from 'semantic-ui-react';

import { CategoryTable } from '../categoryTable/categoryTable';
import { useAppDispatch } from '../../../../../../app/hooks';
import { selectEditor, updateData, updateTitle } from '../../../../slices/editorSlice';
import { useSelector } from 'react-redux';



export interface ICategoryPageProps { }


export const CategoryPage: React.FC<ICategoryPageProps> = () => {

    const appDispatch = useAppDispatch();

    const navigate = useNavigate();

    const location = useLocation()

    const { title, data } = location.state;

    const reducedToBasicDetails = resultsUtils.reduceToBasicDetails(data.results);

    return (
        <Container fluid 
        className={classes.categoryPage}>
            <Button floated='right'
             className={theme.button}
            icon='left arrow'
                compact
                size='tiny'
                style={{ backgroundColor: '#173278', color: '#e1b61d' }} 
                onClick={() => navigate(-1)}
                content='Back to search'
            />
            <h1>{title.toUpperCase()}</h1>

            {reducedToBasicDetails && title === 'people' && <CategoryTable data={reducedToBasicDetails} />}

        </Container>
    )
}