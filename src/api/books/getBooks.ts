import { PaginationState } from "@tanstack/react-table";
import { ENDPOINT } from "../../constants";

const getBooks = async (pagination: PaginationState) => {
    const { pageIndex, pageSize } = pagination;
    const response = await fetch(`${ENDPOINT}/books?_expand=genre&_page=${pageIndex + 1}&_limit=${pageSize}`);
    const totalCount = +(response.headers.get("X-Total-Count") || "");
    const data = await response.json();
    return { data, totalCount };
};

export default getBooks;
