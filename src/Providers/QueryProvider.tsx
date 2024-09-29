import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface IQueryProvider {
    children: JSX.Element;
}

const queryClient = new QueryClient();

const QueryProvider = ({ children }: IQueryProvider) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
