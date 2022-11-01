
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

function Update({viewDisplay}) {
    return (
        <div className='my_model' onClick={() => viewDisplay(false)}>
            <Container className="mt--7" fluid>
                <Row style={{ justifyContent: 'center' }}>
                    <Col className="order-xl-1" xl="7">
                    <button className='cancel_button' onClick={() => viewDisplay(false)}>X</button>
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Update Product</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>

                                    <div className="pl-lg-4">

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label">Name</label>
                                                    <Input className="form-control-alternative" type="text" />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label">Price</label>
                                                    <Input className="form-control-alternative" type="text"/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label className="form-control-label">Description</label>
                                                    <Input className="form-control-alternative" type="text"  />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {/* <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label className="form-control-label" >Phone Number</label>
                                                    <Input className="form-control-alternative" type="text" />
                                                </FormGroup>
                                            </Col>
                                        </Row> */}
                                    </div>
                                    <Button className="my-4" color="primary" type="button">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {/* {<div className="loading"></div>}  */}
                                            <div>Update Profile</div>
                                        </div>
                                        {/* Sign in */}
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Update
