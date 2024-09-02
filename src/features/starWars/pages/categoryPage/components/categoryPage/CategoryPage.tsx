/**
 * [v] A click on “View All” should lead to the category page. You are required to implement only one list page - the people page -
 * [v] all other category pages will be blank with a title only. 
 * [v] On the people page, the results will be displayed as a table 
 * [?] with the option to delete or edit each row. 
 * [v] Don’t display other entities' data in the table (vehicles, films, etc..), only the basic fields.
 * Above the table add a “Create” button - which allows adding a new character. Since there is no API for create/edit/delete,
 * you will handle it locally and there’s no need for persistence - refreshing the page will just reload the initial data.
 */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resultsUtils } from '../../../searchPage/components/Results/resultsUtils';

import classes from './CategoryPage.module.scss';

import '../../../../../../theme/sw-theme.module.scss';

import {
    Button,
    Container
} from 'semantic-ui-react';

import { CategoryTable } from '../categoryTable/categoryTable';



export interface ICategoryPageProps {}


export const CategoryPage: React.FC<ICategoryPageProps> = () => {

    const navigate = useNavigate();

    const location = useLocation()

    const {title, data} = location.state;

    const reducedToBasicDetails = resultsUtils.reduceToBasicDetails(data.results);

    return (
        <Container fluid className={classes.categoryPage}>
            <Button onClick={() => navigate(-1)} content='Back to search' />
            <h1>{title.toUpperCase()}</h1>

            {reducedToBasicDetails && title === 'people' && <CategoryTable data={reducedToBasicDetails} /> }

        </Container>
    )
}