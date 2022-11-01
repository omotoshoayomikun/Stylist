import React, { useEffect, useState } from 'react'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";
import Image from 'next/image';
import img from '../../assets/img/clipper.png'
function View({ viewDetails }) {
    return (
        <div className='my_model' onClick={() => viewDetails(false)}>
            <Container className="mt--7" fluid>
                <Row style={{ justifyContent: 'center' }}>
                    <Col className="order-xl-1" xl="7">
                        <button className='cancel_button' onClick={() => viewDetails(false)}>X</button>
                        <Card className="bg-secondary shadow" style={{height: '400px', overflow: 'hidden'}}>
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">View Product</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs='7' style={{height: '300px', padding: '10px'}}>
                                        <img src={img} alt='Images'className='Imagess' />
                                    </Col>
                                    <Col xs='5'>
                                        <div className='tth'>Name</div>
                                        <div className='ttt'>AZ clipper</div>
                                        <div className='tth'>Price</div>
                                        <div className='ttt'>20,000</div>
                                        <div className='tth'>Discription</div>
                                        <div className='ttt'>Two blade head with 2 hours battery</div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default View
