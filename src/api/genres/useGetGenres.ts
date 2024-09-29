import { useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "../../constants";
import { Genre } from "../../types";

const useGetGenres = () => {
    return useQuery({
        queryKey: ["genres", "list"],
        queryFn: async (): Promise<Genre[]> => {
            const response = await fetch(`${ENDPOINT}/genres`);
            return response.json();
        },
    });
};

export default useGetGenres;
