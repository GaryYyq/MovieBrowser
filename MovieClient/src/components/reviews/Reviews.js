import { useEffect, useRef } from "react";
import api from '../../api/axiosConfig';
import { useParams } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from "react";

const Reviews = ({ getMovieData, movie, reviewIds, setReviews }) => {
// const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {

    // let reviews = [];

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;


        try {

            const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId });

            // const updateReviews = [...reviews, { body: rev.value }];
            const updateReviews = [...reviewIds, { body: rev.value }];


            // reviews.push(rev.value);
            // console.log(updateReviews);
           
            // console.log(reviews);

            rev.value = "";

            setReviews(updateReviews);
        } catch (err) {
            console.error(err);
        }

    }

    return (
        

        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Add a review" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        
                        // reviews?.map((r) => {
                        reviewIds?.map((r) => {

                            
                            
                            return (
                                <>
                                    <Row>
                                        <Col>{r.body}</Col>
                                        
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                        
                    }

                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )

}

export default Reviews;