"use client"

import React, { useState, useMemo } from 'react';
import { TextInput, Button, Grid, Paper, ActionIcon, Group, Container, Title, GridCol } from '@mantine/core';
import { useDebounce } from '@/helpers/hooks/useDebounce';

const ICON_SIZE = 24;
const ICONS_PER_PAGE = 50;

interface IconPickerProps {
    iconMap: { [key: string]: React.ComponentType<any> };
    onSelect: (iconName: string) => void;
}

interface IconWrapperProps {
    iconName: string;
    iconMap: { [key: string]: React.ComponentType<any> };
    onSelect: (iconName: string) => void;
}

const IconPicker = React.memo(function IconPicker({ iconMap, onSelect }: IconPickerProps) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [page, setPage] = useState(1);

  const iconNames = useMemo(() => {
    if (!debouncedSearch) {
        return [];
    }

    return Object.keys(iconMap)
      .filter(name => name.toLowerCase().includes(debouncedSearch.toLowerCase()));
  }, [debouncedSearch]);

  const paginatedIcons = useMemo(() => {
    if (iconNames.length === 0) {
        return [];
    }

    return iconNames.slice(0, page * ICONS_PER_PAGE);
  }, [iconNames, page]);

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container size="lg">
      <Title order={2} mb="md">Icon Picker</Title>
      <TextInput
        placeholder="Search icons..."
        value={search}
        onChange={(event) => handleSearch(event.currentTarget.value)}
        mb="md"
      />
      <Paper>
        <Grid gutter="xs">
          {paginatedIcons.map(iconName => (
            <GridCol key={iconName} span={1}>
                { iconMap[iconName] ? (
                    <IconWrapper 
                        iconName={iconName}
                        iconMap={iconMap}
                        onSelect={onSelect} 
                    />
                ) : null}
            </GridCol>
          ))}
        </Grid>
      </Paper>
      {paginatedIcons.length < iconNames.length && (
        <Group mt="md">
          <Button onClick={loadMore}>Load More</Button>
        </Group>
      )}
    </Container>
  );
});

const IconWrapper = React.memo(
    ({ iconName, iconMap, onSelect }: IconWrapperProps) => {
        const Icon = iconMap[iconName];
        console.count("rendering IconWrapper");
        return Icon ? (
            <ActionIcon
                onClick={() => onSelect(iconName)}
                variant="light"
                size="lg"
            >
                <Icon size={ICON_SIZE} />
            </ActionIcon>
        ) : null;
    }
);

IconPicker.displayName = "IconPicker";
IconWrapper.displayName = "IconWrapper";

export default IconPicker;