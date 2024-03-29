import React from 'react';
import {Card, CardTitle, CardSubtitle, CardText, CardBody} from 'reactstrap';

import './Post.css';
import Avatar from "../Avatar";
import {Link} from "react-router-dom";
//<Link to="/PatientProfile" >View Patient</Link>

const Post = (props) => (
    <Card inverse className="Post" onClick={props.clicked}>

        <CardBody className="d-flex justify-content-center align-items-center flex-column ">
            <CardTitle className="Text">{props.NameFirst} {props.NameLast}</CardTitle>
            <CardText>

            </CardText>
        </CardBody>

    </Card>
);

export default Post;
