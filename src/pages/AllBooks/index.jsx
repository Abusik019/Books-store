import "./style.sass";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBooks } from "./../../store/slices/books";
import { Aside } from "../../components/Aside";
import { NavLink } from "react-router-dom";
import { NavSearch } from "../../components/NavSearch";
import PaginationItem from "../../components/Pagination";

function AllBooks() {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.list);
    const loading = useSelector((state) => state.books.loading);
    const error = useSelector((state) => state.books.error);
    const [filter, setFilter] = useState({
        search: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    function handleSearchChange(value){
        setFilter({...filter, search: value});
        setCurrentPage(1); // Reset to first page on new search
    }

    function filterStringBySubstring(objects, substring){
        const regex = new RegExp(`\\b${substring}`, 'i');
        return objects.filter(obj => regex.test(obj.name));
    }

    useEffect(() => {
        if(!books.length) dispatch(getBooks());
    }, [dispatch]);

    if (loading) return <h2>Loading...</h2>;

    if (error) return <h2>{error}</h2>;

    const filteredBooks = filterStringBySubstring(books, filter.search);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="all-books">
            <Aside />
            <div className="books-container">
                <NavSearch handleSearch={handleSearchChange}/>
                {(filteredBooks.length > 0) ? (
                    <ul className="books-content">
                        {paginatedBooks.map((book) => (
                            <li key={book.id}>
                                <div className="book-image">
                                    <img src={book.avatar} alt={`${book.name} cover`} />
                                </div>
                                <ul className="book-info">
                                    <h1>{book.author}</h1>
                                    <h2>{book.name}</h2>
                                    <div className="price-wrapper">
                                        <h3>{book.price}$</h3>
                                        <NavLink to={`/${book.id}`}><button>View</button></NavLink>
                                    </div>
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <h2>No data</h2>
                )}
                <PaginationItem 
                    current={currentPage} 
                    total={filteredBooks.length} 
                    pageSize={itemsPerPage} 
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
            <div className="empty-def_container"></div>
        </div>
    );
}

export default AllBooks;
