import React, { useState } from "react";
import Link from 'next/link'

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
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
import axios from "axios";


function Register() {
  
  let check = undefined;
  const [errPass, setErrPass] = useState('')
  const [loading, setLoading] = useState(false)

  const [personalDetails, setPersonalDeatils] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    isBusinessOwner: undefined,
  })

  const [error, setError] = useState({
    first: false,
    last: false,
    phone: false,
    email: false,
    pass: false,
    conPass: false,
    checked: false
  })

  const [success, setSuccess] = useState(false)

  const blurLogic = (txt, tip) => {
    tip == 'first' && (txt == '' ? setError({ ...error, first: true }) : setError({ ...error, first: false }));
    tip == 'last' && (txt == '' ? setError({ ...error, last: true }) : setError({ ...error, last: false }));
    const regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    tip == 'phone' && (txt.match(regPhone) ? setError({ ...error, phone: false }) : setError({ ...error, phone: true }));
    const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    tip == 'email' && (txt.match(regEmail) ? setError({ ...error, email: false }) : setError({ ...error, email: true }));
    if (tip == 'pass') {
      if (txt.length == 0) {
        setErrPass("Password can not be empty");
        setError({ ...error, pass: true })
      } else if (txt.length > 0 && txt.length < 6) {
        setErrPass("Password too short")
        setError({ ...error, pass: true })
      } else if (txt.length > 20) {
        setErrPass("Password too long")
        setError({ ...error, pass: true })
      } else if (txt.search(/\d/) == -1) {
        setErrPass("No number")
        setError({ ...error, pass: true })
      } else if (txt.search(/[a-zA-Z]/) == -1) {
        setErrPass("No letter")
        setError({ ...error, pass: true })
      } else if (txt.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
        setErrPass("Bad character");
        setError({ ...error, pass: true })
      } else {
        setError({ ...error, pass: false })
        setErrPass('')
      }
    }

    tip == 'conPass' && (txt != personalDetails.password ? setError({ ...error, conPass: true }) : setError({ ...error, conPass: false }))
  }

  const handleBlur = (txt, tip) => {
    blurLogic(txt, tip)
  }

  const handleChecked = (e, target) => {
    if (target === 'yes') {
     check = true
     setPersonalDeatils({ ...personalDetails, isBusinessOwner: check})
    }
    if (target === 'no') {
      check = false
      setPersonalDeatils({ ...personalDetails, isBusinessOwner: check})
    }
  }

  const handleSubmit = async () => {
    if (personalDetails.firstName == '' && personalDetails.lastName == '' && personalDetails.phoneNumber == '' && personalDetails.email == '' && personalDetails.password == '' && personalDetails.confirmPassword == '') {
      setError({ first: true, last: true, phone: true, email: true, pass: true });
      setErrPass("Password can not be empty");
    } else if (personalDetails.firstName == '') {
      setError({ ...error, first: true });
    } else if (personalDetails.lastName == '') {
      setError({ ...error, last: true });
    } else if (personalDetails.phoneNumber == '') {
      setError({ ...error, phone: true });
    } else if (personalDetails.email == '') {
      setError({ ...error, email: true });
    } else if (personalDetails.password == '') {
      setError({ ...error, pass: true });
    } else if (personalDetails.confirmPassword == '') {
      setError({ ...error, conPass: true });
    } else if (personalDetails.checkBox == false) {
      setError({ ...error, checkBox: true });
    } else if (personalDetails.isBusinessOwner == undefined) {
      setError({...error, checked: true})
    }
    else {
      setError({...error, checked: false})
      setLoading(true)
      try {
        const response = await axios.post('/api/auth/register', {
          personalDetails
        })
        setPersonalDeatils({ firstName: '', lastName: '', phoneNumber: '', email: '', password: '', confirmPassword: '' })
        setSuccess(true)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }

    }

  }


  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            {/* <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div> */}
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-1" style={{ outline: error.first ? '2px solid tomato' : '' }} >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="First Name" type="text" value={personalDetails.firstName} onChange={(e) => setPersonalDeatils({ ...personalDetails, firstName: e.target.value })} onBlur={(e) => handleBlur(e.target.value, 'first')} />
                </InputGroup>
                {error.first && (<small className="errorMeg">First name can't be empty</small>)}
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative mb-1" style={{ outline: error.last ? '2px solid tomato' : '' }}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    value={personalDetails.lastName} onChange={(e) => setPersonalDeatils({ ...personalDetails, lastName: e.target.value })} onBlur={(e) => handleBlur(e.target.value, 'last')} />
                </InputGroup>
                {error.last && (<small className="errorMeg">Last name can't be empty</small>)}
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative mb-1" style={{ outline: error.phone ? '2px solid tomato' : '' }} >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Phone Number"
                    type="text"
                    autoComplete="text"
                    value={personalDetails.phoneNumber} onChange={(e) => setPersonalDeatils({ ...personalDetails, phoneNumber: e.target.value })} onBlur={(e) => handleBlur(e.target.value, 'phone')}
                  />
                </InputGroup>
                {error.phone && <small className="errorMeg">Phone number cannot be lesser than and greater than 11 digits</small>}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-1" style={{ outline: error.email ? '2px solid tomato' : '' }} >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={personalDetails.email} onChange={(e) => setPersonalDeatils({ ...personalDetails, email: e.target.value })} onBlur={(e) => handleBlur(e.target.value, 'email')}
                  />
                </InputGroup>
                {error.email && <small className="errorMeg">Email must be in email format</small>}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative" style={{ outline: error.pass ? '2px solid tomato' : '' }} >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={personalDetails.password}
                    onChange={(e) => {
                      setPersonalDeatils({ ...personalDetails, password: e.target.value })
                    }
                    }
                    onBlur={(e) => handleBlur(e.target.value, 'pass')}
                  />
                </InputGroup>
                {error.pass && <small className="errorMeg">
                  {errPass}
                  {/* The Password must be at least 6 characters long and have at least a special character and number */}
                </small>}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative" style={{ outline: error.conPass ? '2px solid tomato' : '' }} >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    value={personalDetails.confirmPassword} onChange={(e) => setPersonalDeatils({ ...personalDetails, confirmPassword: e.target.value })} onBlur={(e) => handleBlur(e.target.value, 'conPass')}
                  />
                </InputGroup>
                {error.conPass && <small className="errorMeg">Password not thesame</small>}
              </FormGroup>
              <Row className="my-4">
                <Col xs="12">
                  <div className="dd_ff">
                    <div className="mr-5" style={{color: error.checked ? 'red' : ''}}>Do you own a business?</div>
                    <div className="mr-2 dd_ff" ><Input type="radio" name="isBusiness" className="ww_hh" onChange={(e) => { handleChecked(e.target.checked, 'yes') }} /> <span className="mr-4 ml-1">Yes</span></div>
                    <div className="dd_ff"><Input type="radio" name="isBusiness" className="ww_hh" onChange={(e) => { handleChecked(e.target.checked, 'no') }} /><span className="mr-4 ml-1">No</span></div>
                  </div>
                </Col>
              </Row>
              {/* <div className="text-muted font-italic">
                <small>
                  password strength:{" "}

                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div> */}
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      onChange={e => setPersonalDeatils({ ...personalDetails, checkBox: e.target.checked })}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span
                        className="text-muted"
                      >
                        I agree with the{" "}
                        <a href="#pablo">
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                  {error.checkBox && <small className="errorMeg">Agree the terms and condition</small>}
                </Col>
              </Row>

              {success && <div className="successMeg">Registration Successful</div>}

              <div className="text-center">
                <Button className="mt-4" color="primary" type="button" onClick={handleSubmit}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {loading && <div className="loading"></div>} <div>Submit</div>
                  </div>
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3 text-center">
          <Col xs="6">
            <Link href='/auth/login'>
              <a className="text-light"><div>Login</div></a>
            </Link>
          </Col>
          <Col xs="6">
            <Link href='/auth/reg_business'>
              <a className="text-light"><div>Register Business</div></a>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
}

Register.layout = Auth;

export default Register;
