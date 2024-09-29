import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

interface IReusableModal {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

const ReusableModal = ({ open, onOpenChange, children }: IReusableModal) => {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            {children}
        </Dialog.Root>
    );
};

interface IModalContent {
    title: string;
    children: ReactNode;
}

const ModalContent = ({ title, children }: IModalContent) => {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='DialogOverlay'>
                <Dialog.Description />
                <Dialog.Content className="DialogContent w-auto h-auto bg-white rounded-lg flex flex-col">
                    <div className="flex justify-between items-center px-2 pb-4">
                        <Dialog.Title className='font-medium text-lg tracking-wider'>{title}</Dialog.Title>
                        <Dialog.Close asChild>
                            <Cross2Icon className="w-[20px] h-[20px]"/>
                        </Dialog.Close>
                    </div>
                    {children}
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    );
};
ReusableModal.Close = Dialog.Close;
ReusableModal.Button = Dialog.Trigger;
ReusableModal.Content = ModalContent;
export default ReusableModal;
