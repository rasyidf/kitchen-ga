"use client";

import { Row } from "@tanstack/react-table";

import { ActionIcon, Button, Group, Menu, Tooltip } from "@mantine/core";
import { DotsHorizontalIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: Readonly<DataTableRowActionsProps<TData>>) {
  return (
    <ActionIcon.Group>
      <ActionIcon color="blue"  >
        <Pencil1Icon />
      </ActionIcon>
      <ActionIcon color="red" >
        <TrashIcon />
      </ActionIcon>
    </ActionIcon.Group>
  );
}
