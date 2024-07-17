import "./style.sass";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBookById } from "../../store/slices/books.js";
import { Aside } from "../../components/Aside/index.jsx";
import doneImg from '../../assets/done.png'
import deleteImg from '../../assets/delete.png'

function Book() {
    const params = useParams();
    const dispatch = useDispatch();
    const [bookInfo, setBookInfo] = useState();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const book = await dispatch(getBookById(params.id));
                setBookInfo(book);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchBook();
    }, [dispatch]);

    return (
        <div className="book_container">
            <Aside />
            <NavLink className="back-button" to='/'>Back</NavLink>
            {bookInfo?.payload && (
                <div className="book_content">
                    <div className="book_title-container">
                        <h1>{bookInfo.payload.name}</h1>
                        <h2>{bookInfo.payload.author}</h2>
                    </div>
                    <div className="book_main">
                        <img src={bookInfo.payload.avatar} />
                        <div className="book_main-info">
                            <h5>Annotation</h5>
                            <p>{bookInfo.payload.description}</p>
                            <h1>
                                <span>Publishing house</span>{" "}
                                {bookInfo.payload.publishing_house}
                            </h1>
                            <h2>
                                <span>Quantity Pages</span>{" "}
                                {bookInfo.payload.quantity_pages}
                            </h2>
                            <h3>
                                <span>ISBN</span> {bookInfo.payload.isbn}
                            </h3>
                            <h4>
                                <span>Year of issue</span>{" "}
                                {bookInfo.payload.createdAt.match(/\d\d\d\d-\d\d-\d\d/g)}
                            </h4>
                        </div>
                        <div className="buy_book">
                            <h1>{bookInfo.payload.price} $</h1>
                            <div className="isInStock">
                                <img src={bookInfo.payload.stock ? doneImg : deleteImg}/>
                                <h1>{bookInfo.payload.stock ? "In stock" : "Not available"}</h1>
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
