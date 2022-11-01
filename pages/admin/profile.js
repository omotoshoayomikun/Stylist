import React, { useEffect, useState } from "react";

// reactstrap components
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
// layout for this page
import Admin from "layouts/Admin.js";
import cookie from 'cookie'
// core components
import UserHeader from "components/Headers/UserHeader.js";
import Customer_profile from "../../components/profile/customer_profile";
import BusOwner_profile from "../../components/profile/busOwner_profile";
import { useDispatch } from "react-redux";
import { addAuth } from "../../redux/authSlice";

function Profile(props) {

  const dispatch = useDispatch()
  dispatch(addAuth(props.claim))

  const role = props.claim.data.role;

  return (
    <>
    {role === 'BusinessOwner' && <BusOwner_profile claim={props.claim} /> }
    {role === 'Customer' && <Customer_profile claim={props.claim} /> }
      {/* <Customer_profile claim={props.claim} />
      <BusOwner_profile claim={props.claim} /> */}
    </>
  );
}

Profile.layout = Admin;

export default Profile;


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

