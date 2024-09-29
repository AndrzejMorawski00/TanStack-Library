import useDeleteBook from "../../api/books/useDeleteBook";

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    PaginationState,
    useReactTable,
} from "@tanstack/react-table";
import { TableRow } from "../../types";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import getBooks from "../../api/books/getBooks";
import BookDialog from "../Dialog/BookModal";
import DialogConfirm from "../Dialog/DialogConfirm";

const columnHelper = createColumnHelper<TableRow>();

const Table = () => {
    const handleRowDelete = (action: "yes" | "no", id: string) => {
        if (action === "yes") {
            removeBooks.mutate(id);
        } else if (action === "no") {
            return;
        } else {
            throw new Error(`Invalid action ${action}`);
        }
    };

    const columns = [
        columnHelper.accessor("title", {
            header: "Title",
            cell: (props) => <p>{props.getValue()}</p>,
        }),
        columnHelper.accessor("author", {
            header: "Author",
            cell: (props) => <p>{props.getValue()}</p>,
        }),
        columnHelper.accessor("year", {
            header: "Publication year",
            cell: (props) => <p>{props.getValue()}</p>,
        }),
        columnHelper.accessor("copies", {
            header: "Copies",
            cell: (props) => <p>{props.getValue()}</p>,
        }),
        columnHelper.accessor("price", {
            header: "Price",
            cell: (props) => <p>{props.getValue()}</p>,
        }),
        columnHelper.accessor("genre.name", {
            header: "Genre",
            cell: (props) => <p>{props.getValue()}</p>,
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: (props) => {
                const id = props.row.original.id;
                return (
                    <div className="flex gap-2">
                        <BookDialog
                            bttnStyles="px-2 py-1 rounded bg-blue-700 text-slate-100  text-xl tracking-wider hover:bg-blue-600 hover:white"
                            bookId={id}
                        />
                        <DialogConfirm handleRowDelete={handleRowDelete} bookId={id} />
                    </div>
                );
            },
        }),
    ];

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const dataQuery = useQuery({
        queryKey: ["books", "list", pagination],
        queryFn: () => getBooks(pagination),
        placeholderData: keepPreviousData,
    });
    const removeBooks = useDeleteBook();

    const table = useReactTable({
        data: dataQuery.data?.data || [],
        columns,
        pageCount: Math.ceil((dataQuery.data?.totalCount || 0) / pagination.pageSize),
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        debugTable: true,
    });

    return (
        <div className="flex flex-col flex-1 gap-4 bg-slate-100 ">
            <table className="min-w-full">
                <thead className="">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider border-b-2 border-gray-200"
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y-2 divide-gray-200">
                    {table.getRowModel().rows.map((row) => (
                        <tr className="px-6 text-[1.rem] whitespace-nowrap text-sm text-gray-500" key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td className="px-4 py-4" key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-row justify-end items-center pr-7 gap-3">
                <button
                    className="bg-blue-700 px-2 py-1 text-xl text-gray-100 rounded hover:bg-blue-600 hover:text-white disabled:bg-slate-400"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Prev Page
                </button>
                <span className="text-xl tracking-wider">
                    Page {pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <button
                    className="bg-blue-700 px-2 py-1 text-xl text-gray-100 rounded hover:bg-blue-600 hover:text-white disabled:bg-slate-400"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
};

export default Table;
