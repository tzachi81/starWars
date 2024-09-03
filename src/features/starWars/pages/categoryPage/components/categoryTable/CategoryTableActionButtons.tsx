import React from 'react';

import theme from '../../../../../../theme/sw-theme.module.scss';

import {
    ButtonGroup,
    Button,
    Icon,
} from 'semantic-ui-react';
import { setTargetRow } from '../../../../slices/editorSlice';
import { useAppDispatch } from '../../../../../../app/hooks';



interface ICategoryTableActionButtonsProps {
    targetRow: number,
    onEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onDelete: () => void;
}

export const CategoryTableActionButtons: React.FC<ICategoryTableActionButtonsProps> = ({ targetRow, onEdit, onDelete }) => {

    const appDispatch = useAppDispatch();

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, cb: typeof onEdit) => {
        appDispatch(setTargetRow(targetRow));
        cb(event);
    }

    return <ButtonGroup
        inverted>
        <Button icon
            className={theme.button}
            disabled={targetRow === null}
            onClick={(event) => handleOnClick(event, onEdit)}>
            <Icon name='edit' />
        </Button>
        <Button icon
            className={theme.button}
            disabled={targetRow === null}
            onClick={(event) => handleOnClick(event, onDelete)}>
            <Icon name='delete' />
        </Button>
    </ButtonGroup>

}