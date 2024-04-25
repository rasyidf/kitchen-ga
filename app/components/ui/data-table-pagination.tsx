import { Box, Flex, Group, Pagination, Paper, Select, Text, rem, useMantineColorScheme } from "@mantine/core";
import { CaretLeftIcon, CaretRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: Readonly<DataTablePaginationProps<TData>>) {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Paper pos="sticky" bottom={0} py={{ base: 16, md: 0 }}>
      <Flex gap={16} direction={{ base: "column-reverse", md: "row" }} align="center" mih={48} justify={{ base: "center", md: "space-between" }} px={2}>
        <Box flex={1} fz="sm" c={colorScheme === "dark" ? "gray.3" : "gray.8"}>
          {table.getSelectedRowModel().rows.length} of {table.getRowModel().rows.length} row(s) selected.
        </Box>
        <Flex align="center" columnGap={14} >
          <Text className="text-sm font-medium" visibleFrom="md">Rows per page</Text>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onChange={(value) => {
              table.setPageSize(Number(value));
            }}
            withCheckIcon={false}
            allowDeselect={false}
            maw={rem(64)}
            data={["10", "20", "30", "40", "50"]}
          />

          <Flex w={rem(100)} align="center" justify="center" fz="sm"  >
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </Flex>
        </Flex>
        <Flex gap={8} align="center">
          <Pagination.Root
            defaultValue={0}
            total={table.getPageCount()}
            value={table.getState().pagination.pageIndex + 1}
            onChange={(page) => {
              table.setPageIndex(page - 1);
            }}
            onNextPage={() => table.nextPage()}
            onPreviousPage={() => table.previousPage()}
            radius="sm"
          >
            <Group gap={7}>
              <Pagination.Previous icon={() => <CaretLeftIcon />} />
              <Pagination.Items dotsIcon={() => <DotsHorizontalIcon />} />
              <Pagination.Next icon={() => <CaretRightIcon />} />
            </Group>
          </Pagination.Root>
        </Flex>
      </Flex>
    </Paper>
  );
}
