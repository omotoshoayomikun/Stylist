import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/authSlice";

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
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function Login() {

  const router = useRouter()
  const dispatch = useDispatch()
    ;

    const successNotify = () => toast.success("Login successful");
    const errorNotify = () => toast.error(`${error.errMsg}`);

  const [details, setDetails] = useState({ email: '', password: '' })
  const [error, setError] = useState({
    errMsg: '',
    errDis: false
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post('/api/auth/login', details)
      setError({...error, errDis: false})
      setLoading(false)
      successNotify()
      router.push('/admin/dashboard')
    } catch (err) {
      console.log(err)
      setLoading(false)
      err.response.data?.message? setError({...error, errDis: true, errMsg: 'Your Email or password is not correct'}) : setError({...error, errDis: true, errMsg: 'Something went wrong, Try again'})
      errorNotify()
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            {/* <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div> */}
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
                    value={details.email}
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={details.password}
                    onChange={(e) => setDetails({ ...details, password: e.target.value })}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                {/* {error.errDis && <div><small className="errorMeg">{error.errMsg}</small></div>} */}
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={handleSubmit} disabled={loading}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                     {loading && <div className="loading"></div>} <div>Sign in</div>
                  </div>
                  {/* Sign in */}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <Link href='/auth/forget_pass'>
              <a
                className="text-light"

              // onClick={(e) => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <Link href="/auth/register" passHref>
              <a
                style={{ color: '#ced4da' }}
              >
                <small>Create new account</small>
              </a>
            </Link>
          </Col>
        </Row>
      <ToastContainer />
      </Col>
    </>
  );
}

Login.layout = Auth;

export default Login;
