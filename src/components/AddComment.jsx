import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const AddComment = ({ bookId, aggiornaCommenti }) => {
    const [commentObject, setCommentObject] = useState({
        comment: "",
        rate: 1,
        elementId: bookId,
    });

    const sendNewReview = async (e) => {
        e.preventDefault();

        if (commentObject.comment.length < 1) {
            alert("Il commento non può essere vuoto");
            return;
        }

        try {
            const response = await fetch(
                "https://striveschool-api.herokuapp.com/api/comments",
                {
                    method: "POST",
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlkNWJmZmU2Mjg4NjAwMTg4M2Y1MjMiLCJpYXQiOjE3MDQ4MTE1MTksImV4cCI6MTcwNjAyMTExOX0.rHZ8Xie8cXiBh7kguRW7E6EL0xMusK6EZQcNGU0trCQ",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(commentObject),
                }
            );

            if (response.ok) {
                alert("Commento salvato!");
                aggiornaCommenti();
                // ...
            } else {
                const error = await response.json();
                console.error("Error saving comment:", error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Form onSubmit={sendNewReview}>
            <Form.Group className="mb-1 mt-4">
                <Form.Label>Commento</Form.Label>
                <Form.Control
                    type="text"
                    value={commentObject.comment}
                    onChange={(e) => {
                        setCommentObject({
                            ...commentObject,
                            comment: e.target.value,
                        });
                    }}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                    aria-label="comment rating"
                    value={commentObject.rate}
                    onChange={(e) => {
                        setCommentObject({
                            ...commentObject,
                            rate: e.target.value,
                        });
                    }}
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Invia
            </Button>
        </Form>
    );
};

export default AddComment;
