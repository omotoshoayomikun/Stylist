
import React, { useState } from 'react'

// layout for this page
import Admin from "layouts/Admin.js";
import Header from "components/Headers/Header.js";

import {
    Button,
    Card,
    CardHeader,
    Container,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";
import axios from 'axios';
import cookie from 'cookie'
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function Booking({ salom, userClaims, token, claim }) {

    const dispatch = useDispatch()

    dispatch(addAuth(claim))

    //toast message
    const successNotify = () => toast.success("Your booking was successful check your email for your booking number");
    const errorNotify = () => toast.error(`${error.errMsg}`);

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState({
        errDis: false,
        errMsg: '',
        errBookingType: false,
        errBookDate: false,
        errChooseSalon: false,
        errEmail: false,
        errPhone: false,
        errAddress: false,
    })
    const [details, setDetails] = useState({
        userId: userClaims.id,
        customerEmail: userClaims.email,
        customerPhone: '',
        customerAddress: '',
        bookedTime: '',
        bookingType: 'Select Booking Type',
        salonId: 'Choose a salon'
    })

    const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    const handleSubmit = async () => {
        if (details.bookingType === 'Select Booking Type') {
            setError({ ...error, errBookingType: true })
        } else if (details.bookedTime === '') {
            setError({ ...error, errBookDate: true, errBookingType: false })
        } else if (details.salonId === 'Choose a salon') {
            setError({ ...error, errChooseSalon: true, errBookDate: false })
        }
        else if (!details.customerEmail?.match(regEmail)) {
            setError({ ...error, errEmail: true, errChooseSalon: false })
        } else if (!details.customerPhone?.match(regPhone)) {
            setError({ ...error, errPhone: true, errEmail: false })
        }
        else if (details.customerAddress === '') {
            setError({ ...error, errAddress: true, errPhone: false })
        } else {
            setLoading(true)
            try {
                const response = await axios({
                    method: 'post',
                    url: '/api/admin/booking',
                    data: details,
                })
                console.log(await response.data)
                setLoading(false)
                // setSuccess(true)
                // setError(false)
                successNotify();
            } catch (err) {
                // setLoading(false)
                // setSuccess(false)
                err.response.data.message ? setError({ ...error, errDis: true, errMsg: err.response.data.message }) : setError({ ...error, errDis: true, errMsg: 'Somthing went wrong, try again' })
                errorNotify()
            }
        }
    }

    return (
        <div>
            {/* <Header /> */}
            <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8"></div>
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <h3 className="mb-0">Booking</h3>
                            </CardHeader>
                            <CardBody>
                                {/* <FormGroup>
                                    <InputGroup className="input-group-alternative mb-1">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="ni ni-hat-3" /></InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="User ID"
                                            type="text"
                                            value={details.userId}
                                            onChange={(e) => setDetails({ ...details, userId: e.target.value })}
                                        />
                                    </InputGroup>
                                </FormGroup> */}
                                <Row>
                                    <Col sm="12" md="6">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-1" style={{ outline: error.errBookingType ? '3px solid tomato' : '' }}>
                                                <Input id="" name=""
                                                    type="select"
                                                    value={details.bookingType} onChange={(e) => setDetails({ ...details, bookingType: e.target.value })} >
                                                    <option value='Select Booking Type'>Select Booking Type</option>
                                                    <option value='1'>Home Service</option>
                                                    <option value='2'>Shop Service</option>
                                                </Input>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6">
                                        <FormGroup style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ fontSize: '14px' }}>Booked Date/Time:</div>
                                            <InputGroup className="input-group-alternative mb-1" style={{ outline: error.errBookDate ? '3px solid tomato' : '' }}>
                                                <Input
                                                    type="datetime-local"
                                                    value={details.bookedTime}
                                                    onChange={(e) => setDetails({ ...details, bookedTime: e.target.value })}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-1" style={{ outline: error.errChooseSalon ? '3px solid tomato' : '' }}>
                                                <Input id="" name=""
                                                    type="select"
                                                    value={details.salonId} onChange={(e) => setDetails({ ...details, salonId: e.target.value })}
                                                >
                                                    <option value='Choose a salon'>Choose a salon</option>
                                                    {salom.map(salomId => (
                                                        <option key={salomId.id} value={salomId.id}>Name: {salomId.businessName} | Address: {salomId.businessAddress}</option>
                                                    ))}
                                                </Input>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="6">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-1" style={{ outline: error.errEmail ? '3px solid tomato' : '' }}>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i className="ni ni-hat-3" /></InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Email"
                                                    type="text"
                                                    value={details.customerEmail}
                                                    onChange={(e) => setDetails({ ...details, customerEmail: e.target.value })}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="6">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-1" style={{ outline: error.errPhone ? '3px solid tomato' : '' }}>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i className="ni ni-hat-3" /></InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Phone Number"
                                                    type="text"
                                                    value={details.customerPhone}
                                                    onChange={(e) => setDetails({ ...details, customerPhone: e.target.value })}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-1" style={{ outline: error.errAddress ? '3px solid tomato' : '' }}>
                                        <Input
                                            placeholder="Address"
                                            type="textarea"
                                            value={details.customerAddress}
                                            onChange={(e) => setDetails({ ...details, customerAddress: e.target.value })}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                {/* {error.errDis && <div className="errorMeg">{error.errMsg}</div>}
                                {success && <div className="successMeg"> <i className="ni circle-check" />Your booking was successful check your email for your booking number</div>} */}
                                <Button color="primary" style={{ width: '100%' }} disabled={loading} onClick={handleSubmit}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {loading && <div className="loading"></div>} <div>Submit</div>
                                    </div>
                                </Button>
                            </CardBody>
                        </Card>

                    </div>
                </Row>
                <ToastContainer />
            </Container>
        </div>
    )
}

Booking.layout = Admin;

export default Booking

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
    const token = claims.data.token
    const userClaim = claims.data

    const response = await axios({
        url: 'https://stylistconnect.azurewebsites.net/api/Salon/GetRegisteredBusinesses',
        headers: {
            'Accept': 'text/plain',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.data

    return {
        props: {
            salom: data?.data,
            userClaims: userClaim,
            token: token,
            claim: claims
        }
    }
}