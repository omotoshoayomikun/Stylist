
import React, { useEffect, useState } from 'react'
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
import { ToastContainer, toast} from 'react-toastify'

function Customer_profile(props) {
    const claims = props.claim.data;

    const [msg, setMsg] = useState({ success: false, error: false, errMsg: '' })
    const [loading, setLoading] = useState(false)
    const [userDetails, setUserDetails] = useState({
        firstName: claims.firstName,
        lastName: claims.lastName,
        email: claims.email,

    })

    const successNotify = () => toast.success("Update successfully");
    const errorNotify = () => toast.success(`${msg.errMsg}`);


    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await axios({
                method: 'put',
                url: '/api/auth/update_user',
                data: userDetails,
            })
            const data = await response.data
            setLoading(false)
            // setMsg({ ...msg, success: true, error: false })
            successNotify()
        } catch (err) {
            setLoading(false)
            err.response.data.message ? setMsg({ success: false, error: true, errMsg: err.response.data.message }) : setMsg({ success: false, error: true, errMsg: 'An error occur, Try again' })
            errorNotify()
        }
    }
    return (
        <>
            <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8"></div>
            <Container className="mt--7" fluid>
                <Row style={{ justifyContent: 'center' }}>
                    <Col className="order-xl-1" xl="7">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Edit Profile</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        User information
                                    </h6>
                                    <div className="pl-lg-4">

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
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label className="form-control-label">Email</label>
                                                    <Input className="form-control-alternative" disabled type="text" value={userDetails.email} onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} />
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
                                    {/* {msg.error && <div className="errorMeg">{msg.errMsg}</div>}
                                    {msg.success && <div className="successMeg"> <i className="ni circle-check" />Update successfully</div>} */}
                                    <Button className="" color="primary" type="button" disabled={loading} onClick={handleSubmit}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {loading && <div className="loading"></div>} <div>Update Profile</div>
                                        </div>
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
        </>
    )
}

// Customer_profile.layout = Admin

export default Customer_profile




