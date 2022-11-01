
import React, { useState } from 'react'
import Admin from '../../layouts/Admin';
import Image from 'next/image'

import Header from "components/Headers/Header.js";

import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
    Button,
} from "reactstrap";
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/authSlice';
import cookie from 'cookie'
import Update from '../../components/Product/Update';
import View from '../../components/Product/View';

function All_product(props) {

    const dispatch = useDispatch()

    dispatch(addAuth(props.claim))

    const [update, setUpdate] = useState(false)
    const [view, setView] = useState(false)
    return (
        <>
            <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8"></div>
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">All Product</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr className=' text-center'>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Images</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='text-center'>
                                        <th>Clipper</th>
                                        <td>2k herz Clipper</td>
                                        <td>20,000</td>
                                        <td>
                                            <img src={require("assets/img/clipper.png")} alt='Images' width={50} height={50} style={{ objectFit: 'contain' }} />
                                        </td>
                                        <td>
                                            <Button className="my-4" color="success" type="button" onClick={() => setView(true)}>
                                                <div>View</div>
                                            </Button>
                                            <Button className="my-4" color="warning" type="button" onClick={() => setUpdate(true)}>
                                                <div>Update</div>
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>
            {update && <div><Update viewDisplay={setUpdate} /></div>}
            {view && <div><View viewDetails={setView}/></div>}
            
        </>
    )
}

All_product.layout = Admin

export default All_product

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