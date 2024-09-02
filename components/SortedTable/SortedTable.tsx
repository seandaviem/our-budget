'use client'

import { useState, useEffect, useMemo } from 'react';
import {
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    rem,
    TableTh,
    TableTr,
    TableTd,
    TableTbody,
    TableTrProps,
    TableThead,
    Pagination,
  } from '@mantine/core';
  import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
  import classes from './SortedTable.module.css';
  import { RowData, TableCol } from '@/budget-types';
  import { sortRowData } from '@/helpers/sortRowData';
import { chunkTableData } from '@/helpers/chunkTableData';

  interface ThProps {
    children: React.ReactNode;
  }
  interface SortableThWrapperProps extends ThProps {
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
  }

  interface SortedTableProps {
    data: RowData[];
    cols: TableCol[];
    overrideRowsFunc?: ((data: RowData[]) => React.ReactElement<TableTrProps>[]) | null;
    showPagination?: boolean;
    itemsPerPage?: number;
  }


  //NOTE: Hold off on pagination in url params for now until caching is figured out
  /*Additional Features to add later:
  // 1. Add search functionality
  // 2. Add url parms later
  // 3. Add other filtering options
  // 4. Decide if we event want pagination, or if we want to do infinite scroll
  */

  export default function SortedTable({ data, cols, overrideRowsFunc = null, showPagination = false, itemsPerPage = -1 } : SortedTableProps) {

    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const chunkedData = useMemo(() => {
        if (!showPagination) {
            return [sortedData];
        }

        return chunkTableData(sortedData, itemsPerPage);
    }, [sortedData, showPagination, itemsPerPage]);

    useEffect(() => {
        setSortedData(sortRowData(data, { sortBy, reversed: reverseSortDirection }));
    }, [data, sortBy, reverseSortDirection]);

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortRowData(data, { sortBy: field, reversed }));
        if (setCurrentPage !== null) {
            setCurrentPage(1);
        }
    };

    const heads = cols.map((col) => {
        const [key, label, sortable] = col;
        return sortable ? (
            <SortableThWrapper
                key={key}
                sorted={sortBy === key}
                reversed={reverseSortDirection}
                onSort={() => setSorting(key)}
            >
                {label}
            </SortableThWrapper>
        ) : 
        (
            <Th key={key}>{label}</Th>
        )
        ;
    });

    const rows = overrideRowsFunc !== null ? overrideRowsFunc(chunkedData[currentPage - 1]) : chunkedData[currentPage - 1].map((row) => {
        // TODO: This is going to break if you pass objects and such...
        const cells = cols.map((col) => {
            const [key] = col;
            return <TableTd key={key}>{row[key]}</TableTd>
        });

        return <TableTr key={row.id}>{cells}</TableTr>
    });

    return (
        <>
            <ScrollArea>
                <Table className='sorted-table' horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                    <TableThead>
                        <TableTr>
                            {heads}
                        </TableTr>
                    </TableThead>
                    <TableTbody>
                        {rows.length > 0 ? (
                            rows
                        ): (
                            <TableTr>
                                <TableTd colSpan={cols.length}>
                                    <Text fw={500} ta="center">
                                        Nothing found
                                    </Text>
                                </TableTd>
                            </TableTr>
                        )}
                    </TableTbody>
                </Table>
            </ScrollArea>
            { showPagination && (
                <Pagination 
                    className="mt-10" 
                    value={currentPage} 
                    onChange={setCurrentPage} 
                    total={chunkedData.length} /> 
            )}
        </>
    );
  }

  function Th({ children }: ThProps) {    
    return (
        <TableTh className={classes.th}>
            <Text fw={500} fz="sm" className={classes.nonControl}>
                {children}
            </Text>
        </TableTh>
    );
  }

  function SortableThWrapper({ children, reversed, sorted, onSort }: SortableThWrapperProps) {
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    
    return (
        <TableTh className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon
                            style={{ width: rem(16), height: rem(16) }}
                            stroke={1.5}
                        />
                    </Center>
                </Group>
            </UnstyledButton>
        </TableTh>
    );
  }