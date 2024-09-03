import React, { ReactEventHandler, useCallback, useEffect, useRef, useState } from 'react';

import { resultsUtils } from '../../../searchPage/components/Results/resultsUtils';

import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table,
    Container,
} from 'semantic-ui-react'
import useClickOutside from '../../../../customHooks/customHooks';


interface ICategoryTableProps {
    data: { [key: string]: any }[];
}

export const CategoryTable: React.FC<ICategoryTableProps> = ({ data }) => {

    const tableRef = useRef<HTMLTableElement>(null);

    const [targetRow, setTargetRow] = useState<string | null>(null);

    const columns = Object.keys(data[0]);

    const updateTargetRow = useCallback((event: React.MouseEvent<HTMLElement>) => {
        return setTargetRow(event.currentTarget.id);
    }, [setTargetRow]);

    const handleClickOutside = () => {
        setTargetRow(null);
    };

    // Use the custom hook
    useClickOutside(tableRef, handleClickOutside);



    return (
        <Table
            ref={tableRef}
            color='black'
            inverted
            selectable
            striped
            fixed
        >
            <TableHeader>
                <TableRow id="columns">
                    {columns.map((column: string, index: number) => {
                        return <TableHeaderCell key={index}
                            content={
                                <div style={{ color: '#e1b61d' }}>{resultsUtils.splitUnderscore(column).toUpperCase()}</div>
                            }
                        />
                    })}
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((row, index: number) => {
                    return <TableRow key={index}
                        id={index.toString()}
                        active={targetRow === index.toString()}
                        onClick={updateTargetRow}
                    >
                        {Object.keys(row).map((cell: any, index: number) => {
                            return <TableCell
                                key={index}
                                tooltip={row[cell]}
                                style={{ color: '#3a9dd9' }}
                            >{row[cell]}
                            </TableCell>
                        })}
                    </TableRow>
                })}

            </TableBody>
        </Table>
    )
};
