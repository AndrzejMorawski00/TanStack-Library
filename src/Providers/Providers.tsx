import QueryProvider from "./QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface IProviders {
    children: JSX.Element;
}

const Providers = ({ children }: IProviders) => {
    return (
        <QueryProvider>
            <>
                {children}
                <ReactQueryDevtools />
            </>
        </QueryProvider>
    );
};

export default Providers;
