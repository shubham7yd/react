import Card from 'react-bootstrap/Card';
import "./ContentCard.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
const ContentCard = ({ category, key, cardKey }) => {
    const capsCat = category.charAt(0).toUpperCase() + category.slice(1)
    const [open, setOpen] = useState(false)
    const [joke, setJoke] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const getJoke = async () => {
        setIsLoading(true)
        let config = {
            method: "get",
            url: `https://api.chucknorris.io/jokes/random?category=${category}`,
            maxBodyLength: Infinity,
            headers: {}
        }
        axios.request(config)
            .then((response) => {
                let data = response.data
                let jokeVal = data.value
                // console.log(joke);
                setJoke(jokeVal)
                setIsLoading(false)

            }).catch((error) => {
                console.log("ERROR", error);
            })
    }

    useEffect(() => {
        getJoke()
    }, [])

    const openModal = () => {
        setOpen(!open)
    }

    return (
        <>
            <div className='cardContainer' key={cardKey} onClick={openModal}>
                <h4>{capsCat}</h4>
                <p>Unlimited Jokes on {capsCat}</p>
            </div>
            <Modal
                show={open}
                onHide={openModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {capsCat}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? (
                        <div className="loading">

                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <h4>{joke}</h4>
                    )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={getJoke}>Next Joke</Button>
                </Modal.Footer>
            </Modal>
        </>

    );
}

export default ContentCard;