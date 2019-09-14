import React from 'react';
import PropTypes from '../../assets/util/PropTypes';
import classNames from 'classnames';
import { Card, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
import Avatar from '../Avatar';
import {Link} from "react-router-dom";
import './Card.css';



const UserCard = ({
  avatar,
  avatarSize,
  title,
  subtitle,
  children,
  className,
  ...restProps
}) => {
  const classes = classNames('bg-gradient-theme', className);


  return (

    <Card inverse className={classes} {...restProps}>

      <CardBody className="d-flex justify-content-center align-items-center flex-column ">
        <Avatar src={avatar} size={avatarSize} className="mb-2" />
        <CardTitle className="Text">{title}</CardTitle>
        <CardSubtitle className="Text">{subtitle}</CardSubtitle>
        <CardText>
          <Link to="/PatientProfile" >View Patient</Link>
        </CardText>
      </CardBody>
      {children}

    </Card>

  );
};

UserCard.propTypes = {
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  view: PropTypes.string,
  className: PropTypes.string,
};

UserCard.defaultProps = {
  avatarSize: 80,
};

export default UserCard;