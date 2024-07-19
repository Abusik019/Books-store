import "./style.sass";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Aside } from "../../components/Aside/index.jsx";
import doneImg from '../../assets/done.png'
import deleteImg from '../../assets/delete.png'

function Book() {
    const params = useParams();
    const [bookInfo, setBookInfo] = useState(null);
    const books = useSelector((state) => state.books.list);

    function getBookById(books, id){
        return books.filter(el => el.id === id)[0];
    }

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const book = getBookById(books, params.id);
                setBookInfo(book);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchBook();
    }, [books]);

    return (
        <div className="book_container">
            <Aside />
            <NavLink className="back-button" to='/'>Back</NavLink>
            {bookInfo && (
                <div className="book_content">
                    <div className="book_title-container">
                        <h1>{bookInfo.name}</h1>
                        <h2>{bookInfo.author}</h2>
                    </div>
                    <div className="book_main">
                        <img src={bookInfo.avatar} />
                        <div className="book_main-info">
                            <h5>Annotation</h5>
                            <p>{bookInfo.description}</p>
                            <h1>
                                <span>Publishing house</span>{" "}
                                {bookInfo.publishing_house}
                            </h1>
                            <h2>
                                <span>Quantity Pages</span>{" "}
                                {bookInfo.quantity_pages}
                            </h2>
                            <h3>
                                <span>ISBN</span> {bookInfo.isbn}
                            </h3>
                            <h4>
                                <span>Year of issue</span>{" "}
                                {bookInfo.createdAt.match(/\d\d\d\d-\d\d-\d\d/g)}
                            </h4>
                        </div>
                        <div className="buy_book">
                            <h1>{bookInfo.price} $</h1>
                            <div className="isInStock">
                                <img src={bookInfo.stock ? doneImg : deleteImg}/>
                                <h1>{bookInfo.stock ? "In stock" : "Not available"}</h1>
                            </div>
                            <button>Add to cart</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Book;
