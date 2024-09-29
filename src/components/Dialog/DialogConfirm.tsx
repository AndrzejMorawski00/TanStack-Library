import { useState } from "react";
import ReusableModal from "../ReusableModal/ReusableModal";

interface IDialogConfirm {
    handleRowDelete: (value: "yes" | "no", bookId: string) => void;
    bookId: string;
}

const DialogConfirm = ({ handleRowDelete, bookId }: IDialogConfirm) => {
    const [open, setOpen] = useState(false);

    return (
        <ReusableModal open={open} onOpenChange={(newValue: boolean) => setOpen(newValue)}>
            <ReusableModal.Button asChild>
                <button
                    className="px-2 py-1 rounded bg-blue-700 text-slate-100  text-xl tracking-wider hover:bg-blue-600 hover:white"
                    onClick={() => setOpen(true)}
                >
                    Delete
                </button>
            </ReusableModal.Button>
            <ReusableModal.Content title="Delete Row?">
                <div className="flex flex-row min-w-[250px] justify-between px-2 py-2">
                    <button
                        className="bg-blue-700 px-3 py-1 text-white rounded text-l tracking-wider hover:bg-blue-800"
                        onClick={() => (setOpen(false), handleRowDelete("yes", bookId))}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-blue-700 px-3 py-1 text-white rounded text-l tracking-wider hover:bg-blue-800"
                        onClick={() => (setOpen(false), handleRowDelete("no", bookId))}
                    >
                        No
                    </button>
                </div>
            </ReusableModal.Content>
        </ReusableModal>
    );
};

export default DialogConfirm;
