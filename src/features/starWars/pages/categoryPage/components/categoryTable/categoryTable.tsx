import React from 'react';

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


interface ICategoryTableProps {
    data: { [key: string]: any }[];
}

export const CategoryTable: React.FC<ICategoryTableProps> = ({ data }) => {

    const columns = Object.keys(data[0]);

    return (
        <div style={{  }}>
        <Table
            celled 
            fixed 
            singleLine
        >
            <TableHeader>
                <TableRow id="columns">
                    {columns.map((column: string, index: number) => {
                        return <TableHeaderCell key={index}>{resultsUtils.splitUnderscore(column).toUpperCase()}</TableHeaderCell>
                    })}
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((row, index: number) => {
                    return <TableRow key={index}>
                        {Object.keys(row).map((cell: any, index: number) => {
                            return <TableCell key={index}>{row[cell]}</TableCell>
                        })}
                    </TableRow>
                })}

            </TableBody>
        </Table>
        </div>
    )
};
