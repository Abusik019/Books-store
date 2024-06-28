import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBooks } from "./../../store/slices/books";
import { Aside } from "../../components/Aside";

function AllBooks() {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.list);
    const loading = useSelector((state) => state.books.loading);
    const error = useSelector((state) => state.books.error);
    const [hoveredBookId, setHoveredBookId] = useState(null);

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    if (error) return <h2>{error}</h2>;

    if (!books.length && loading === false) {
        return <h2>No data</h2>;
    }

    return (
        <div className="all-books">
            <Aside />
            <div className="books-container">
                <h1>
                    <b>All</b> books
                </h1>
                <ul className="books-content">
                    {books.map((book) => (
                        <li
                            key={book.id}
                            onMouseEnter={() => setHoveredBookId(book.id)}
                            onMouseLeave={() => setHoveredBookId(null)}
                        >
                            <div className="book-image">
                                <img src={book.avatar} />
                                <button style={{ display: hoveredBookId === book.id ? 'block' : 'none' }}>Read</button>
                            </div>
                            <ul className="book-info">
                                <h1>{book.author}</h1>
                                <h2>{book.name}</h2>
                                <h3>{book.price}$</h3>
                                <h4>
                                    {book.createdAt.match(
                                        /\d\d\d\d-\d\d-\d\d/g
                                    )}
                                </h4>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="empty-def_container"></div>
        </div>
    );
}

export default AllBooks;
