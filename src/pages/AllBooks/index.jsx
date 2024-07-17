import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBooks } from "./../../store/slices/books";
import { Aside } from "../../components/Aside";
import { NavLink } from "react-router-dom";

function AllBooks() {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.list);
    const loading = useSelector((state) => state.books.loading);
    const error = useSelector((state) => state.books.error);

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);

    if (loading) return <h2>Loading...</h2>;

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
                        >
                            <div className="book-image">
                                <img src={book.avatar} />
                            </div>
                            <ul className="book-info">
                                <h1>{book.author}</h1>
                                <h2>{book.name}</h2>
                                <div className="price-wrapper">
                                    <h3>{book.price}$</h3>
                                    <NavLink to={`/${book.id}`}><button></button></NavLink>
                                </div>
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
