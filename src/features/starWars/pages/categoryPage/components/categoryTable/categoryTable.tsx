import classes from './categoryTable.module.scss';

import React, { useCallback, useMemo, useRef, useState } from "react"

import { resultsUtils } from "../../../searchPage/components/Results/resultsUtils"

import theme from "../../../../../../theme/sw-theme.module.scss"

import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  Segment,
  Button,
  Icon,
} from "semantic-ui-react"

// import useClickOutside from '../../../../customHooks/customHooks';
import { CategoryTableActionButtons } from "./CategoryTableActionButtons"
import { CategoryTableModal } from "./CategoryTableModal"
import { TCategoryEntity } from "./types/categoryTypes"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../../../../app/hooks"

import { openModal } from "../../../../slices/systemSlice"
import {
  selectEditor,
  setMode,
  setTargetRow,
} from "../../../../slices/editorSlice"

interface ICategoryTableProps {
  data: { [key: string]: any }[]
}

export const CategoryTable: React.FC<ICategoryTableProps> = ({ data }) => {
  const appDispatch = useAppDispatch()
  const system = useSelector((state: any) => state.system)
  const { isModalOpen } = system

  const { targetRow } = useSelector(selectEditor)

  const tableRef = useRef<HTMLTableElement>(null)

  // const [targetRow, setTargetRow] = useState<number>(-1);

  const [tableData, setTableData] = useState(data)

  const columns = Object.keys(data[0])

  const updateTargetRow = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      return appDispatch(setTargetRow(Number(event.currentTarget.id)))
    },
    [appDispatch, setTargetRow],
  )

  const updateData = useCallback(
    (data: any) => {
      setTableData((prevData: { [key: string]: any }[]) => {
        let temp = []
        if (targetRow === -1) {
          temp = [...prevData, data]
        } else {
          temp = [
            ...prevData.slice(0, targetRow),
            data,
            ...prevData.slice(targetRow + 1),
          ]
        }
        return temp
      })
    },
    [targetRow, setTableData],
  )

  const addRow = useCallback((event: React.MouseEvent<HTMLElement>) => {
    updateTargetRow(event);
    appDispatch(setMode("add"))
    appDispatch(openModal())
  }, [tableData, openModal, setMode, targetRow])

  const editRow = useCallback((event: React.MouseEvent<HTMLElement>) => {
    updateTargetRow(event);
    appDispatch(setMode("edit"))
    appDispatch(openModal())
  }, [tableData, openModal, setMode, targetRow])

  const deleteRow = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    updateTargetRow(event);
    // const targetRow = Number((event.target as HTMLElement).id);
    const targetRow = Number((event.target as HTMLElement).id);
    const confirm = window.confirm(
      `You are about to delete row ${targetRow+1} ("${tableData[targetRow].name}")`,
    );

    if (confirm) {
      const updatedData = tableData.filter((_, index) => index !== targetRow)
      setTableData(updatedData)
    }
  }, [tableData, targetRow, setTableData])

  const labels: string[] = useMemo(() => {
    return columns.map((column: string, index: number) => {
      return resultsUtils.splitUnderscore(column).toUpperCase()
    })
  }, [columns])

  return (
    <>
      <Segment basic>
        {tableData.length > 0 && <CategoryTableModal
          isOpen={isModalOpen}
          labels={labels}
          targetRow={targetRow ?? -1}
          tableData={tableData}
          updateData={updateData}
        />}
      </Segment>
      {tableData.length > 0 ?
      (<Segment ref={tableRef} basic>
        <Button icon className={theme.button} onClick={addRow}>
          <Icon name="add" />
        </Button>
        <Table className={classes.table}  inverted selectable striped fixed>
          <TableHeader>
            <TableRow id="columns">
              <TableHeaderCell
                content={
                  <div style={{ color: "#e1b61d" }}>
                    {"Actions".toUpperCase()}
                  </div>
                }
              />
              {labels.map(label => {
                return (
                  <TableHeaderCell
                    key={label}
                    content={<div style={{ color: "#e1b61d" }}>{label}</div>}
                  />
                )
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {tableData.map((row, index: number) => {
              return (
                <TableRow
                  key={index}
                  id={index.toString()}
                  onClick={updateTargetRow}
                >
                  <TableCell>
                    <CategoryTableActionButtons
                      targetRow={index}
                      onDelete={deleteRow}
                      onEdit={editRow}
                    />
                  </TableCell>
                  {Object.keys(row).map((cell: any, index: number) => {
                    return (
                      <TableCell
                        key={index}
                        tooltip={row[cell]}
                        style={{ color: "#3a9dd9" }}
                      >
                        {row[cell]}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Segment>) : 
      <p>There is no more data here. Please click on "Back to search"</p>
      }
    </>
  )
}
