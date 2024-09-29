interface IBookModal {
    bookId: string;
    handleFormClose: () => void;
}

import { useForm } from "@tanstack/react-form";

import useAddBook from "../../api/books/useAddBook";
import useUpdateBook from "../../api/books/useUpdateBook";
import useGetBook from "../../api/books/useGetBook";

import useGetGenres from "../../api/genres/useGetGenres";
import { FieldApi } from "@tanstack/react-form";

import { Book, Genre } from "../../types";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em>{field.state.meta.errors.join(", ")}</em>
            ) : null}
            {field.state.meta.isValidating ? "Validating..." : null}
        </>
    );
}
const DialogForm = ({ bookId, handleFormClose }: IBookModal) => {
    const addMutation = useAddBook();
    const updateMutation = useUpdateBook();

    const { data: bookData, isLoading: isBookLoading, isError: isBookError } = useGetBook(bookId);
    const { data: genresData, isLoading: isGenresLoading, isError: isGenresError } = useGetGenres();
    const form = useForm({
        defaultValues: {
            title: bookData ? bookData.title : "",
            author: bookData ? bookData.author : "",
            year: bookData ? bookData.year : "",
            description: bookData ? bookData.description : "",
            copies: bookData ? bookData.copies.toString() : "",
            price: bookData ? bookData.price.toString() : "",
            genre: bookData ? bookData.genre : "",
        },
        onSubmit: async ({ value }) => {
            const copies: number = typeof value.copies === "string" ? parseInt(value.copies) : 0;
            const price: number = typeof value.price === "string" ? parseFloat(value.copies) : 0;
            const genre: Genre | undefined =
                typeof value.genre === "string"
                    ? genresData?.filter((genre) => genre.name === value.genre)[0]
                    : value.genre;
            if (!genre) {
                throw new Error("Invalid book genre");
            }
            const data: Omit<Book, "id"> = {
                title: value.title,
                author: value.author,
                year: value.year,
                description: value.description,
                copies: copies,
                price: price,
                genreId: genre.id,
            };
            if (bookId) {
                await updateMutation.mutateAsync({ id: bookId, ...data });
                handleFormClose();
            } else {
                await addMutation.mutateAsync(data);
                handleFormClose();
            }
        },
    });

    if (isBookLoading || isGenresLoading) {
        return <div>Loading...</div>;
    }

    if (isBookError || isGenresError) {
        return <div>Error</div>;
    }

    return (
        <form
            className="flex flex-col gap-5 min-w-[50vw] w-fit"
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
        >
            <div className="flex flex-row gap-6 justify-around">
                <div className="flex flex-col gap-2">
                    <form.Field
                        name="title"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? "A Title is required"
                                    : value.length < 3
                                    ? "Title must be at least 3 characters long"
                                    : undefined,
                        }}
                        children={(field) => (
                            <div className="flex flex-col gap-1">
                                <label htmlFor={field.name} className="LabelClass">
                                    Title:
                                </label>

                                <input
                                    className="InputClass"
                                    type="text"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />

                    <form.Field
                        name="author"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? "An Author is required"
                                    : value.length < 3
                                    ? "Author must be at least 3 characters long"
                                    : undefined,
                        }}
                        children={(field) => (
                            <div className="flex flex-col gap-1">
                                <label className="LabelClass" htmlFor={field.name}>
                                    Author:
                                </label>
                                <input
                                    className="InputClass"
                                    type="text"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />

                    <form.Field
                        name="year"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? "A publication year is required"
                                    : +value < 1900
                                    ? "A publication year must be greater than 1900"
                                    : undefined,
                        }}
                        children={(field) => (
                            <div className="flex flex-col gap-1">
                                <label className="LabelClass" htmlFor={field.name}>
                                    Publication Date:
                                </label>
                                <input
                                    className="InputClass"
                                    type="number"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />

                    <form.Field
                        name="description"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? "A Description is required"
                                    : value.length < 3
                                    ? "Description must be least 3 characters long"
                                    : undefined,
                        }}
                        children={(field) => (
                            <div className="flex flex-col gap-1">
                                <label className="LabelClass" htmlFor={field.name}>
                                    Description:
                                </label>
                                <input
                                    className="InputClass"
                                    type="text"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <form.Field
                        name="copies"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? "A number of copies is required"
                                    : +value < 1
                                    ? "Number of copies must be greater than 0"
                                    : undefined,
                        }}
                        children={(field) => (
                            <div className="flex flex-col gap-1">
                                <label className="LabelClass" htmlFor={field.name}>
                                    Copies:
                                </label>
                                <input
                                    className="InputClass"
                                    type="number"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />

                    <form.Field
                        name="price"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? "A price is required"
                                    : +value < 0
                                    ? "Price must be a positive number"
                                    : undefined,
                        }}
                        children={(field) => (
                            <div className="flex flex-col gap-1">
                                <label className="LabelClass" htmlFor={field.name}>
                                    Price:
                                </label>
                                <input
                                    className="InputClass"
                                    type="number"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                <FieldInfo field={field} />
                            </div>
                        )}
                    />

                    <form.Field
                        name="genre"
                        validators={{
                            onChange: ({ value }) => {
                                if (typeof value === "string") {
                                    return genresData?.filter((genre) => genre.name === value).length === 0
                                        ? "You need to select a valid genre"
                                        : undefined;
                                } else {
                                    return genresData?.filter((genre) => genre.name === value.name).length === 0
                                        ? "You need to select a valid genre"
                                        : undefined;
                                }
                            },
                        }}
                        children={(field) => {
                            return (
                                <div className="flex flex-col gap-1">
                                    <label htmlFor={field.name} className="label-class">
                                        Genre:
                                    </label>
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value.toString()}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.setValue(e.target.value)}
                                        className="input-class"
                                    >
                                        <option value={bookData?.genre.name}>{bookData?.genre.name}</option>
                                        {genresData?.map((genre) => (
                                            <option key={genre.id} value={genre.name}>
                                                {genre.name}
                                            </option>
                                        ))}
                                    </select>
                                    <FieldInfo field={field} />
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
            <button
                className="px-2 py-1 rounded bg-blue-700 text-slate-100  text-xl tracking-wider hover:bg-blue-600 hover:white"
                type="submit"
            >
                {bookId ? "Edit" : "Add"}
            </button>
        </form>
    );
};

export default DialogForm;
