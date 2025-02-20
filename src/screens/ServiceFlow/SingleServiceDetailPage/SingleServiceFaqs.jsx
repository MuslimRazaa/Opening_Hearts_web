import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";

function SingleServiceFaqs({data}) {
    // const questions = [
    //     "What is graphic design?",
    //     "What software do graphic designers commonly use?",
    //     "What are the key principles of graphic design?",
    //     "How can I improve my graphic design skills?",
    //     "What is the difference between raster and vector graphics?",
    // ];

    return (
        <div className="single-service-faqs">
            <div className="container">
                <h2 className="text-center mb-4">{data?.name}</h2>
                <Accordion>
                    {data?.service_f_a_q_s.map((question, index) => (
                        <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header>{question?.question}</Accordion.Header>
                            <Accordion.Body>
                                {question?.answer}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

export default SingleServiceFaqs;
