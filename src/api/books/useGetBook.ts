import { useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "../../constants";
import { TableRow } from "../../types";
const useGetBook = (bookId: string) => {
    return useQuery({
        queryKey: ["books", "single", bookId],
        queryFn: async (): Promise<TableRow> => {
            const response = await fetch(`${ENDPOINT}/books/${bookId}?_expand=genre`);
            if (!response.ok) {
                throw new Error(`Falied to update Book. Response status: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        },
        enabled: !!bookId,
    });
};

export default useGetBook;
