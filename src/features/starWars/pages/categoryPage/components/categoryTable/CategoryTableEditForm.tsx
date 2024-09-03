import React, { useCallback, useEffect, useState } from 'react'
import classes from '../../../../../../theme/sw-theme.module.scss';
import { FormField, Button, Form } from 'semantic-ui-react'
import { TCategoryEntity } from './types/categoryTypes';
import { useSelector } from 'react-redux';
import { selectEditor, setMode } from '../../../../slices/editorSlice';
import { useAppDispatch } from '../../../../../../app/hooks';
import { closeModal } from '../../../../slices/systemSlice';


interface ICategoryTabelEditForm {
    labels: string[];
    data: TCategoryEntity;
    targetRow: number;
    updateEntity: (data: {}, targetRow: number| null) => void;
}

const CategoryTabelEditForm: React.FC<ICategoryTabelEditForm> = ({ updateEntity, data, labels, targetRow }) => {

    const appDispatch = useAppDispatch();

    // const { mode } = useSelector(selectEditor);

    useEffect(() => {
        setEntity(data);
    }, [data]);

    const [entity, setEntity] = useState<TCategoryEntity | null>(data);

    const onFormSubmit = useCallback(() => {
        if (entity) {
            updateEntity(entity, targetRow);
            appDispatch(setMode('view'));
            appDispatch(closeModal());
        }
    }, [updateEntity, entity, appDispatch, targetRow]);

    const onFormFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEntity((prevEntity) => ({
            ...prevEntity,
            [name]: value,
        }));
    }, [setEntity]);


    return <Form color='black'
        size='small'
        widths='equal'
        onSubmit={onFormSubmit}
    >
        {
            entity && Object.keys(entity).map((dataItem, index) => (
                <FormField key={dataItem} >

                    <label style={{ color: '#e1b61d' }}>{labels[index]}</label>

                    <input name={dataItem}
                        placeholder={`Edit ${dataItem}`}
                        onChange={onFormFieldChange}
                        value={entity[dataItem]}
                    />

                </FormField>
            ))
        }
        <Button className={classes.button} type='submit'>Update</Button>
    </Form>
}

export default CategoryTabelEditForm