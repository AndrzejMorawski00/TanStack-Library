import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINT } from "../../constants";
import { Book } from "../../types";

const useUpdateBook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (bookData: Book) => {
            const { id } = bookData;
            const response = await fetch(`${ENDPOINT}/books/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData),
            });
            return response.json();
        },
        onSuccess: (_, data) => {
            queryClient.invalidateQueries({
                queryKey: ["books", "list"],
            }),
                queryClient.invalidateQueries({
                    queryKey: ["books", "single", data.id],
                });
        },
    });
};

export default useUpdateBook;
