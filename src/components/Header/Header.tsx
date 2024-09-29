import BookModal from "../Dialog/BookModal";

const Header = () => {
    return (
        <header className="flex w-full justify-between px-10 py-5">
            <h1 className="text-white text-3xl font-medium  tracking-wide">TanStack Library</h1>
            <BookModal
                bttnStyles=" px-3 py-1 rounded bg-blue-700 text-slate-100  text-2xl tracking-wider hover:bg-blue-600 hover:white"
                bookId=""
            />
        </header>
    );
};

export default Header;
