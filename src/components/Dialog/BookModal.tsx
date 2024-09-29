import { useState } from "react";
import DialogForm from "./DialogForm";
import ReusableModal from "../ReusableModal/ReusableModal";

interface IBookModal {
    bookId: string;
    bttnStyles: string;
}

const BookModal = ({ bookId, bttnStyles }: IBookModal) => {
    const [open, setOpen] = useState(false);

    return (
        <ReusableModal open={open} onOpenChange={(newValue: boolean) => setOpen(newValue)}>
            <ReusableModal.Button asChild>
                <button className={bttnStyles} onClick={() => setOpen(true)}>
                    {bookId ? "Edit" : "Add New"}
                </button>
            </ReusableModal.Button>
            <ReusableModal.Content title={bookId ? "Edit Row" : "Add New Row"}>
                <DialogForm bookId={bookId} handleFormClose={() => setOpen(false)} />
            </ReusableModal.Content>
        </ReusableModal>
    );
};

export default BookModal;
