import { useState, useEffect } from "react";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";

const CommentArea = (props) => {
    const [comments, setComments] = useState([]);

    useEffect(() => getComments(), [props.bookId]);

    const aggiornaCommenti = () => {
        getComments();
    };

    const getComments = () => {
        fetch(
            "https://striveschool-api.herokuapp.com/api/comments/" +
                props.bookId,
            {
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlkNWJmZmU2Mjg4NjAwMTg4M2Y1MjMiLCJpYXQiOjE3MDQ4MTE1MTksImV4cCI6MTcwNjAyMTExOX0.rHZ8Xie8cXiBh7kguRW7E6EL0xMusK6EZQcNGU0trCQ",
                },
            }
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("errore nel recupero dei commenti");
                }
            })
            .then((arrayOfComments) => {
                console.log(arrayOfComments);
                setComments(arrayOfComments);
            })
            .catch((err) => {
                console.log("error", err);
            });
    };

    return (
        <div>
            <div>
                <CommentsList reviews={comments} />
            </div>
            <div>
                <AddComment
                    bookId={props.bookId}
                    aggiornaCommenti={aggiornaCommenti}
                />
            </div>
        </div>
    );
};

export default CommentArea;
