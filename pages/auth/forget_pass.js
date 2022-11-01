import axios from "axios";
import Auth from "layouts/Auth.js"
import { useState } from "react";

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
} from "reactstrap";

function ForgetPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        try {
            const response = axios.post('/api/auth/forget_pass', { email })
            console.log(response.data)
        } catch (err) {

        }
    }
    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <Form role="form">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        autoComplete="new-email"
                                        value={email} onChange={e => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            {/* <div className="custom-control custom-control-alternative custom-checkbox">
                                <input
                                    className="custom-control-input"
                                    id=" customCheckLogin"
                                    type="checkbox"
                                />
                               
                                <div>
                                    <small className="errorMeg">Your Email or password is not correct</small>
                                </div> 
                            </div> */}
                            <div className="text-center">
                                <Button className="my-4" color="primary" type="button" onClick={handleSubmit}>
                                    SEND
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}

ForgetPassword.layout = Auth

export default ForgetPassword