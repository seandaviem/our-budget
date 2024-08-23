'use client'

import { useState, useEffect } from 'react';
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
  } from '@mantine/core';
  import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
  import classes from './SortedTable.module.css';

  export type TableCol = [key: string, label: string, sortable: boolean];

  export type RowData = {
    id: string | number;
  } & {
    [key: string]: any;
  };

  interface ThProps {
    children: React.ReactNode;
  }
  interface SortableThWrapperProps extends ThProps {
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
  }

  interface SortPayload {
    sortBy: keyof RowData | null;
    reversed: boolean;
  }

  interface SortedTableProps {
    data: RowData[];
    cols: TableCol[];
    overrideRowsFunc?: ((data: RowData[]) => React.ReactElement<TableTrProps>[]) | null;
  }

  function sortData(data: RowData[], payload: SortPayload) {
    const { sortBy, reversed } = payload;

    if (!sortBy) {
        return data;
    }

    return [...data].sort((a, b) => {
        if (typeof a[sortBy] === 'string') {
            return reversed ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
        }

        return reversed ? (b[sortBy] as any) - (a[sortBy] as any) : (a[sortBy] as any) - (b[sortBy] as any)
    });
  }

  export default function SortedTable({ data, cols, overrideRowsFunc = null } : SortedTableProps) {

    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    useEffect(() => setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection })), [data]);

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed }));
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

    const rows = overrideRowsFunc !== null ? overrideRowsFunc(sortedData) : sortedData.map((row) => {
        // TODO: This is going to break if you pass objects and such...
        const cells = cols.map((col) => {
            const [key] = col;
            return <TableTd key={key}>{row[key]}</TableTd>
        });

        return <TableTr key={row.id}>{cells}</TableTr>
    });

    return (
        <ScrollArea>
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                <TableTbody>
                    <TableTr>
                        {heads}
                    </TableTr>
                </TableTbody>
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