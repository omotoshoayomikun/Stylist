
import React, { useEffect, useState } from 'react'
import Admin from "layouts/Admin.js";
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
import { useDispatch, useSelector } from 'react-redux';
import { addAuth } from '../../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Settings(props) {

    //// THIS IS WHAT KEEPS THE SIDE BAR CAUSE EACH TIME THE PAGE RELOAD IT SET ABD STORE THE STATE MANAGEMENT(REDUX) COMING FROM THE SERVERSIDEPROPS
    const dispatch = useDispatch()
    dispatch(addAuth(props.claim))
    /////////////////////////////////
    const userEmail = useSelector((state) => state.auth.userDetails[0]?.data.email)
    const [isLoading, setisLoading] = useState(false)
    const [msg, setMsg] = useState({ password: false, confirmPassword: false })
    const [details, setDetails] = useState({
        email: userEmail,
        password: '',
        confirmPassword: '',
    })

    ////Toast message
    const successNotify = () => toast.success("Password reset successful");
    const errorNotify = () => toast.error(`An error occur. Please try again`);

    useEffect(() => {
        if (userEmail) {
            // setDetails({...details, email: userEmail})
        }
    }, [userEmail])

    const handleSubmit = async () => {
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*_#?&])[A-Za-z\d@$!%*_^()=#`~+<>,./\/|}{[?&]{6,}$/
        if (!details.password.match(pattern) || details.password == '') {
            setMsg({ ...msg, password: true })
        } else if (details.password !== details.confirmPassword) {
            setMsg({ password: false, confirmPassword: true })


        }
        else {
            setisLoading(true)
            try {
                const response = await axios({
                    method: 'post',
                    url: '/api/auth/reset_pass',
                    data: details
                })
                setisLoading(false)
                // setMsg({ error: false, success: true })
                setDetails({ ...details, password: '', confirmPassword: '' })
                successNotify()
            } catch (err) {
                console.log(err)
                setisLoading(false)
                // setMsg({ error: true, success: false })
                errorNotify()
            }
        }
    }



    return (
        <>
            <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8"></div>
            <Container className="mt--7" fluid>
                <Row style={{ justifyContent: 'center' }}>
                    <Col className="order-xl-1" xl="6">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Reset Password</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label className="form-control-label">Email</label>
                                                    <Input className="form-control-alternative" disabled={true} type="text" value={details.email} onChange={e => setDetails({ ...details, email: e.target.value })} />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label className="form-control-label">Password</label>
                                                    <Input className="form-control-alternative" type="password" value={details.password} onChange={e => setDetails({ ...details, password: e.target.value })} />
                                                    {msg.password && (<small className="errorMeg">Password most be at least 6 letter with a special character</small>)}
                                                </FormGroup>
                                            </Col>
                                            <Col lg="12">
                                                <FormGroup>
                                                    <label className="form-control-label">Comfirm Password</label>
                                                    <Input className="form-control-alternative" type="password" value={details.confirmPassword} onChange={e => setDetails({ ...details, confirmPassword: e.target.value })} />
                                                    {msg.confirmPassword && (<small className="errorMeg">Password are not thesame</small>)}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        {/* {msg.success && <div className="successMeg">Password reset successful</div>}
                                        {msg.error && <div><small className="errorMeg">An error occur. Please try again</small></div>} */}
                                    </div>
                                    <Button className="my-4" color="primary" type="button" onClick={handleSubmit}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {isLoading && <div className="loading"></div>} <div>Reset Password</div>
                                        </div>
                                        {/* Sign in */}
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

Settings.layout = Admin

export default Settings


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

