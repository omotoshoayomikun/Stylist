
import React, { useState } from 'react'
// import Admin from "layouts/Admin.js";
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
import Link from 'next/link';
import cookie from 'cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/authSlice';

function BusOwner_profile(props) {
    const claims = props.claim.data;

    // const dispatch = useDispatch()

    // dispatch(addAuth(props.claim))

    const [userDetails, setUserDetails] = useState(
        {
            email: claims.email,
            firstName: claims.firstName,
            lastName: claims.lastName,

        }
    )

    return (
        <>
            <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8"></div>
            <Container className="mt--7" fluid>
                <Row style={{ justifyContent: 'center' }}>
                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Edit Profile</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        {/* <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            <Link href='/admin/busOwner_settings'>
                                            <a style={{color: 'white'}}>Settings</a>
                                            </Link>
                                            
                                        </Button> */}
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        Business information
                                    </h6>
                                    <div className="pl-lg-4">

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label">Business name</label>
                                                    <Input className="form-control-alternative" type="text" />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label">Rc_Number</label>
                                                    <Input className="form-control-alternative" type="text" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label className="form-control-label">Address</label>
                                                    <Input className="form-control-alternative" type="text" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label className="form-control-label" >Location</label>
                                                    <Input className="form-control-alternative" type="text" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label">Phone Number</label>
                                                    <Input className="form-control-alternative" type="text" />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label">Email</label>
                                                    <Input className="form-control-alternative" type="email" />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label">Opening Time</label>
                                                    <Input className="form-control-alternative" type="text" />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label">Closing Time</label>
                                                    <Input className="form-control-alternative" type="text" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Button className="my-4" color="primary" type="button">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {/* {<div className="loading"></div>}  */}
                                            <div>Update Business</div>
                                        </div>
                                        {/* Sign in */}
                                    </Button>
                                    <hr className="my-4" />
                                    {/* Address */}
                                    <h6 className="heading-small text-muted mb-4">
                                        Personal information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label className="form-control-label">Email</label>
                                                    <Input className="form-control-alternative" disabled type="text" value={userDetails.email} onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label">First Name</label>
                                                    <Input className="form-control-alternative" type="text" value={userDetails.firstName} onChange={e => setUserDetails({ ...userDetails, firstName: e.target.value })} />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label">Last Name</label>
                                                    <Input className="form-control-alternative" type="text" value={userDetails.lastName} onChange={e => setUserDetails({ ...userDetails, lastName: e.target.value })} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
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
        </>
    )
}

// BusOwner_profile.layout = Admin

export default BusOwner_profile

