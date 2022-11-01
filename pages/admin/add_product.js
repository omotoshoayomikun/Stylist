
import React, { useState } from 'react'

// layout for this page
import Admin from "layouts/Admin.js";
import Header from "components/Headers/Header.js";
import cookie from 'cookie'

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
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/authSlice';


function Add_product(props) {

    const dispatch = useDispatch()
    dispatch(addAuth(props.claim))
    const [selectedImage, setSelectedImage] = useState([])

    const [details, setDetails] = useState({
        name: '',
        description: '',
        // salonId: '',
        price: '',
        productImage: undefined
    })

    const handleImages = (e) => {
        const selectedFile = e.target.files;
        console.log(Array.isArray(selectedFile));
        const selectedFileArray = Array.from(selectedFile)
        console.log(selectedFileArray)

        const imageArray = selectedFileArray.map(file => {
            return URL.createObjectURL(file)
        })
        setSelectedImage(imageArray)

    }
    const handleSubmit = () => {
        console.log(props.claim)
    }

    return (
        <div>
            <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8"></div>
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <h3 className="mb-0">Add Product</h3>
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    {/* <InputGroup className="input-group-alternative mb-1">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="ni ni-hat-3" /></InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Salon ID"
                                            type="text"
                                            value={details.salonId}
                                            onChange={(e) => setDetails({ ...details, salonId: e.target.value })}
                                        />
                                    </InputGroup> */}
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-1">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="ni ni-hat-3" /></InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Product Name"
                                            type="text"
                                            value={details.name}
                                            onChange={(e) => setDetails({ ...details, name: e.target.value })}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-1">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="ni ni-hat-3" /></InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Description"
                                            type="text"
                                            value={details.description}
                                            onChange={(e) => setDetails({ ...details, description: e.target.value })}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-1">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><i className="ni ni-hat-3" /></InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Price"
                                            type="text"
                                            value={details.price}
                                            onChange={(e) => setDetails({ ...details, price: e.target.value })}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <Row className='dd_ff'>
                                    <Col xs='2'>
                                        {/* <div style={{ marginTop: '10px', color: 'black', fontWeight: 'bold' }}>Choose Image:</div> */}
                                        <FormGroup>
                                            <button className='plus_button'>
                                                +
                                                <input type='file' onChange={(e) => handleImages(e)} />
                                            </button>
                                            <small>Add Image</small>
                                        </FormGroup>
                                    </Col>
                                    <Col xs='10'>
                                        <FormGroup>
                                            {selectedImage && selectedImage.map(img => {
                                                return (
                                                    <div className='dd_ff' key={img}>
                                                        <div className='xcv'>
                                                            <img src={img} style={{ width: '140px', height: '140px', objectFit: 'contain' }} />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {/* <InputGroup className="input-group-alternative mb-1">
                                                <Input
                                                    type="file" name='file' style={{ padding: '7px 10px' }}
                                                    value={details.productImage}
                                                    onChange={handleFile}
                                                />
                                            </InputGroup> */}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button color="primary" style={{ width: '100%' }} onClick={handleSubmit}>
                                    SUBMIT 
                                </Button>
                            </CardBody>
                        </Card>

                    </div>
                </Row>
            </Container>
        </div>
    )
}

Add_product.layout = Admin;

export default Add_product

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