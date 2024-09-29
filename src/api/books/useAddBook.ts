import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINT } from "../../constants";
import { Book } from "../../types";
const useAddBook = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (bookData: Omit<Book, "id">) => {
            const response = await fetch(`${ENDPOINT}/books`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData),
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["books", "list"],
            });
        },
    });
};

export default useAddBook;
