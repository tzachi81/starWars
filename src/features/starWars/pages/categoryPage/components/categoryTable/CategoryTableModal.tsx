import React, { useCallback, useEffect, useMemo } from 'react';

import theme from '../../../../../../theme/sw-theme.module.scss';

import { TCategoryEntity } from './types/categoryTypes';

import {
    Button,
    Modal,
    ModalHeader,
    ModalContent,
    Flag,
} from 'semantic-ui-react'
import CategoryTableEditForm from './CategoryTableEditForm';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../../../app/hooks';
import { closeModal } from '../../../../slices/systemSlice';
import { selectEditor, setMode, setTargetRow } from '../../../../slices/editorSlice';


interface ICategoryTableActionButtonsProps {
    isOpen: boolean,
    labels: string[],
    tableData: TCategoryEntity[],
    targetRow: number,
    updateData: (data: any, targetRow: number) => void;
}

export const CategoryTableModal: React.FC<ICategoryTableActionButtonsProps> = ({ labels, tableData, isOpen, targetRow, updateData }) => {


    const appDispatch = useAppDispatch();
    const system = useSelector((state: any) => state.system);
    const { isModalOpen } = system;

    const { mode } = useSelector(selectEditor);


    const createFormData: TCategoryEntity = useMemo(() => {
        if (mode === 'edit') {
            return tableData[targetRow]
        } else {
            const emptyEntity = Object.keys(tableData[0]).reduce((acc: any, key) => {
                acc[key] = "";
                return acc;
            }, {});
            return emptyEntity;
        }
    }, [tableData, targetRow, mode]);

    const handleUpdateData = useCallback((data: any) => {
        updateData(data, targetRow);
    }, [updateData]);


    const handleCloseModal = useCallback(() => {
        appDispatch(setMode('view'));
        appDispatch(setTargetRow(-1));
        appDispatch(closeModal());
    }, [closeModal, appDispatch]);



    return (

        <Modal
            size='large'
            centered
            open={isModalOpen}
        >
            <ModalHeader
                style={{ backgroundColor: 'black', color: '#e1b61d' }}
                content={
                    <>
                        <span>Edit entity</span>
                        <Button floated='right'
                            className={theme.button}
                            onClick={handleCloseModal}
                        >
                            <p style={{ color: '#e1b61d' }}>Close</p>
                        </Button>
                    </>
                } />

            <ModalContent style={{ backgroundColor: '#161F38', color: '#e1b61d' }}>
                <CategoryTableEditForm labels={labels}
                    data={createFormData}
                    targetRow={targetRow}
                    updateEntity={handleUpdateData}
                />
            </ModalContent>
        </Modal >
    )
}