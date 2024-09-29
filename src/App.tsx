import Header from "./components/Header/Header";
import Table from "./components/Table/Table";

function App() {
    return (
        <div className="w-screen h-screen bg-blue-950 flex flex-col gap-2">
            <Header />
            <Table/>
        </div>
    );
}

export default App;
