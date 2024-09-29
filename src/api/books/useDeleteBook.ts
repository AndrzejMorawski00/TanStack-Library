import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ENDPOINT } from "../../constants";

const useDeleteBook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (bookId: string) => {
            const response = await fetch(`${ENDPOINT}/books/${bookId}`, {
                method: "DELETE",
            });
            return response.json();
        },
        onSuccess: (_, data) => {
            queryClient.invalidateQueries({
                queryKey: ["books", "list"],
            }),
                queryClient.removeQueries({
                    queryKey: ["books", "single", data],
                });
        },
    });
};

export default useDeleteBook;
