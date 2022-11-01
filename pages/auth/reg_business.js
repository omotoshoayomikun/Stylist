import React, { useState } from "react";
import Link from 'next/link';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    Text,
    Container
} from "reactstrap";
// layout for this page
import Admin from "../../layouts/Admin";
import cookie from 'cookie'
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/authSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function reg_Business(props) {

    const dispatch = useDispatch()
    dispatch(addAuth(props.claim))
    const userId = props.claim.data.id

        ////Toast message
        const successNotify = () => toast.success("Business register successful");
        const errorNotify = () => toast.error(`${msg.errMsg}`);

    const [msg, setMsg] = useState({ success: false, error: false, errMsg: '' })
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState({
        businessName: '',
        businessAddress: '',
        phoneNumber: '',
        rc_Number: '',
        email: '',
        openingTime: '',
        closingTime: '',
        location: '',
        userId: userId
    })

    const handleTime = (e, target) => {
        const time = e.target.value
        const timeSlice = time.slice(0, 2)
        const minSlice = time.slice(2)
        if (target === "opening time") {
            if (timeSlice > 12) {
                let dTime = (timeSlice - 12) + minSlice + " " + "PM"
                setDetails({ ...details, openingTime: dTime })
            } else {
                let dTime = time + " " + "AM"
                setDetails({ ...details, openingTime: dTime })
            }
        }
        if (target === "closing time") {
            if (timeSlice > 12) {
                let dTime = (timeSlice - 12) + minSlice + " " + "PM"
                setDetails({ ...details, closingTime: dTime })
            } else {
                let dTime = time + " " + "AM"
                setDetails({ ...details, closingTime: dTime })
            }
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: '/api/auth/reg_business',
                data: details
            })
            const data = await response.data
            setLoading(false)
            setMsg({ ...msg, success: true, error: false })
            successNotify()
            setDetails({
                businessName: '',
                businessAddress: '',
                phoneNumber: '',
                rc_Number: '',
                email: '',
                openingTime: '',
                closingTime: '',
                location: '',
                userId: userId
            })
            // console.log(data)
        } catch (err) {
            console.log(err.response.data.message)
            setLoading(false)
            err.response.data.message ? setMsg({ success: false, error: true, errMsg: err.response.data.message }) : setMsg({ success: false, error: true, errMsg: 'An error occur, Try again' })
            errorNotify()
        }
    }


    return (
        <>
            <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8"></div>
            <Container className="mt--8" fluid>
                <Row style={{ justifyContent: 'center' }}>
                    <Col lg="6" md="8">
                        <Card className="bg-secondary shadow border-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <Form role="form">
                                    <FormGroup>
                                        {/* <InputGroup className="input-group-alternative mb-1">
                                    <InputGroupAddon addonType="prepend"><InputGroupText><i className="ni ni-hat-3" /></InputGroupText></InputGroupAddon>
                                    <Input
                                        placeholder="User ID"
                                        type="text"
                                        value={details.userId}
                                        onChange={(e) => setDetails({ ...details, userId: e.target.value })}
                                    />
                                </InputGroup> */}
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-1">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="ni ni-hat-3" /></InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Business Name"
                                                type="text"
                                                value={details.businessName}
                                                onChange={(e) => setDetails({ ...details, businessName: e.target.value })}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-1">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="ni ni-hat-3" /></InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Business Address"
                                                type="text"
                                                value={details.businessAddress}
                                                onChange={(e) => setDetails({ ...details, businessAddress: e.target.value })}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-1">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="ni ni-hat-3" /></InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Phone Number"
                                                type="text"
                                                value={details.phoneNumber}
                                                onChange={(e) => setDetails({ ...details, phoneNumber: e.target.value })}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-1">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="ni ni-hat-3" /></InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="RC Number"
                                                type="text"
                                                value={details.rc_Number}
                                                onChange={(e) => setDetails({ ...details, rc_Number: e.target.value })}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-1">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="ni ni-hat-3" /></InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                placeholder="Email"
                                                type="text"
                                                value={details.email}
                                                onChange={(e) => setDetails({ ...details, email: e.target.value })}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup>
                                                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Opening Time</label>
                                                <InputGroup className="input-group-alternative mb-1">
                                                    <Input
                                                        placeholder="Opening Time"
                                                        type="time"
                                                        // value={details.openingTime}
                                                        onChange={(e) => handleTime(e, "opening time")}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Closing Time</label>
                                                <InputGroup className="input-group-alternative mb-1">
                                                    <Input
                                                        placeholder="Closing Time"
                                                        type="time"
                                                        // value={details.closingTime}
                                                        onChange={(e) => handleTime(e, "closing time")}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative mb-1">
                                            <Input
                                                placeholder="Location"
                                                type="textarea"
                                                value={details.location}
                                                onChange={(e) => setDetails({ ...details, location: e.target.value })}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    {/* {msg.error && <div className="errorMeg">{msg.errMsg}</div>}
                                    {msg.success && <div className="successMeg"> <i className="ni circle-check" />Business register successful</div>} */}
                                    <div className="text-center">
                                        <Button className="" color="primary" type="button" disabled={loading} onClick={handleSubmit}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {loading && <div className="loading"></div>} <div>Submit</div>
                                            </div>
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                        {/* <Row className="mt-3 text-center">
                    <Col xs="6">
                        <Link href='/auth/login'>
                            <a className="text-light"><div>Login</div></a>
                        </Link>
                    </Col>
                    <Col xs="6">
                        <Link href='/auth/register'>
                            <a className="text-light"><div>Register</div></a>
                        </Link>
                    </Col>
                </Row> */}
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
        </>
    )
}

reg_Business.layout = Admin

export default reg_Business

export const getServerSideProps = async (ctx) => {
    const cookies = ctx.req.headers.cookie || ''
    if (!cookies) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }
    const getCookie = cookie.parse(cookies)
    const claims = JSON.parse(getCookie.token)
    return {
        props: {
            claim: claims
        }
    }
}