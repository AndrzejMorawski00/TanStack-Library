import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "../../constants";
import { TableRow } from "../../types";

const useGetBooks = (pageIndex: number, pageSize: number) => {
    return useQuery({
        queryKey: ["books", "list"],
        queryFn: async (): Promise<{
            data: TableRow[];
            totalCount: number;
        }> => {
            const response = await fetch(`${ENDPOINT}/books?_expand=genre&_page=${pageIndex}&_limit=${pageSize}`);
            const totalCount = +(response.headers.get("X-Total-Count") || "");
            const data = await response.json();
            return { data, totalCount };
        },
        placeholderData: keepPreviousData,
    });
};

export default useGetBooks;
