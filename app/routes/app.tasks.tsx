import { Box, Paper } from "@mantine/core";
import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { ColumnFiltersState, ColumnSizingState, RowSelectionState, SortingState, TableState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { PageHeader } from "~/components/PageHeader";
import { columns } from "~/components/modules/tasks/columns";
import { DataTable } from "~/components/ui/data-table";
import { PersonelNames } from "~/constants/Personel";
import { ShiftTask, shiftTaskName } from "~/services/engine/types";



export const loader = async ({ request }: LoaderFunctionArgs) => {
    // get search params
    const searchParams = new URLSearchParams(request.url.split("?")[1]);
    const page = searchParams.get("page") ?? undefined;
    const pageSize = searchParams.get("size") ?? 10;

    if (page === undefined) {
        return redirect("/app/tasks?page=1");
    }

    const startIndex = Number(page) * Number(pageSize) - Number(pageSize);
    const endIndex = Number(page) * Number(pageSize);


    // return page data
    if (page && Number(page) >= 1) {

        return json({
            data: {
                data: Object.keys(shiftTaskName).slice(startIndex, endIndex).map((key, index) => ({
                    id: index + 1,
                    title: shiftTaskName[key as ShiftTask],
                    status: "Active",
                })),
                meta: {
                    pageIndex: Number(page) - 1,
                    pageSize: 10,
                    pageCount: Math.ceil(Object.keys(shiftTaskName).length / 10),
                },
            },
        });
    }
    return json({
        data: {
            data: [],
            meta: {
                pageIndex: 0,
                pageSize: 1,
                pageCount: 0,
            },
        }
    });
};

export default function Index() {
    const [state, setState] = useState<TableState>({
        pagination: {
            pageIndex: 0,
            pageSize: 10,
        },
        rowSelection: {} as RowSelectionState,
        sorting: [] as SortingState,
        columnFilters: [] as ColumnFiltersState,
        globalFilter: "",
        columnPinning: {},
        columnVisibility: {},
        columnSizing: {} as ColumnSizingState,
    } as TableState);

    const { data } = useLoaderData<typeof loader>();

    const navigate = useNavigate();

    useEffect(() => {
        if (state && state.pagination.pageIndex >= 0 && state.pagination.pageIndex <= (data.meta.pageCount ?? 10)) {
            navigate(`/app/tasks?page=${state.pagination.pageIndex + 1}`);
        }
    }, [state]);

    return (
        <Paper>
            <PageHeader title="Tugas" subtitle="Kelola Tugas yang terdaftar di sistem" />
            <Box mt={16}>
                <DataTable data={data} columns={columns} state={state} setState={setState} />
            </Box>
        </Paper>
    );
}