import { useState } from "react";
import { Card } from "react-bootstrap";

const SingleBook = (props) => {
    const [selected, setSelected] = useState(false);
    return (
        <>
            <Card
                onClick={() => {
                    setSelected(!selected);
                    props.changeAsin(props.book.asin);
                }}
                style={{
                    border:
                        props.book.asin === props.selectedAsin
                            ? "3px solid red"
                            : "none",
                }}
            >
                <Card.Img variant="top" src={props.book.img} />
                <Card.Body>
                    <Card.Title style={{ color: "black" }}>
                        {props.book.title}
                    </Card.Title>
                </Card.Body>
            </Card>
        </>
    );
};

export default SingleBook;
