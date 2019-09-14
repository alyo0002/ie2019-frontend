import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UncontrolledDropdown, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';


import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import MetisMenu from 'metismenujs/dist/metismenujs';
import profilePic from '../assets/images/users/Petra-1.jpg';



const SideNavContent = () => {
    return <React.Fragment>

        <div id="sidebar-menu">
            <ul className="metismenu" id="side-menu">
                <li className="menu-title">Navigation</li>

                <li>
                    <Link to="/dashboard" className="waves-effect side-nav-link-ref">
                        <i className="mdi mdi-view-dashboard"></i>
                        <span> Dashboard </span>
                    </Link>
                </li>

                <li>
                    <Link to="/" className="waves-effect" aria-expanded="false">
                        <i className="mdi mdi-menu"></i>
                        <span> Menu </span>
                        <span className="menu-arrow"></span>
                    </Link>

                    <ul className="nav-second-level nav" aria-expanded="false">
                        <li>
                            <Link to="/patients" className="side-nav-link-ref">Patients</Link>
                        </li>


                        <li>
                            <Link to="/Administration" className="side-nav-link-ref">Administration</Link>
                        </li>


                        <li>
                                        <Link to="/" className="has-dropdown"  >Forms
                                            <span className="menu-arrow"></span>
                                        </Link>

                                        <ul className="nav-third-level nav">
                                                <li>
                                                   <Link to="/formComplete" className="side-nav-link-ref">Complete Form</Link>
                                                </li>
                                                <li>
                                                   <Link to="/fromCreate" className="side-nav-link-ref">Create Form</Link>
                                                </li>
                                        </ul>
                        </li>


                        <li>
                            <Link to="/" className="has-dropdown">Reports
                                <span className="menu-arrow"></span>
                            </Link>
                            <ul className="nav-third-level nav" aria-expanded="true">
                                <li>
                                    <Link to="/reports" className="side-nav-link-ref">Complete Report</Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link to="/tasks" className="side-nav-link-ref">Scheduler</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div className="clearfix"></div>
    </React.Fragment>
}

const UserProfile = () => {
    return <React.Fragment>
        <div className="user-box text-center">
            <img src={profilePic} alt="user-img" title="Petra Van Der Merwe" className="rounded-circle img-thumbnail avatar-lg" />
            <UncontrolledDropdown>
                <DropdownToggle caret tag="a" className="text-dark dropdown-toggle h5 mt-2 mb-1 d-block">
                    Petra Van Der Merwe
                </DropdownToggle>
                <DropdownMenu className="user-pro-dropdown">
                    <DropdownItem>
                        <i className="fe-user mr-1"></i>
                        <span>My Account</span>
                    </DropdownItem>
                    <DropdownItem>
                        <i className="fe-settings mr-1"></i>
                        <span>Settings</span>
                    </DropdownItem>
                    <DropdownItem>
                        <i className="fe-log-out mr-1"></i>
                        <span>Logout</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>

            <p className="text-muted">Admin</p>
            <ul className="list-inline">
            </ul>
        </div>
    </React.Fragment>
}


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.handleOtherClick = this.handleOtherClick.bind(this);
        this.initMenu = this.initMenu.bind(this);
    }

    /**
     * Bind event
     */
    componentWillMount = () => {
        document.addEventListener('mousedown', this.handleOtherClick, false);
    }


    /**
     * 
     */
    componentDidMount = () => {
        this.initMenu();
    }

    /**
     * Component did update
     */
    componentDidUpdate = (prevProps) => {
        if (this.props.isCondensed !== prevProps.isCondensed) {
            if (prevProps.isCondensed) {
                document.body.classList.remove("sidebar-enable");
                document.body.classList.remove("enlarged");
            } else {
                document.body.classList.add("sidebar-enable");
                const isSmallScreen = window.innerWidth < 768;
                if (!isSmallScreen) {
                    document.body.classList.add("enlarged");
                }
            }

            this.initMenu();
        }
    }

    /**
     * Bind event
     */
    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleOtherClick, false);
    }

    /**
     * Handle the click anywhere in doc
     */
    handleOtherClick = (e) => {
        if (this.menuNodeRef.contains(e.target))
            return;
        // else hide the menubar
        document.body.classList.remove('sidebar-enable');
    }

    /**
     * Init the menu
     */
    initMenu = () => {
        // render menu
        new MetisMenu("#side-menu");
        var links = document.getElementsByClassName('side-nav-link-ref');
        var matchingMenuItem = null;
        for (var i = 0; i < links.length; i++) {
            if (this.props.location.pathname === links[i].pathname) {
                matchingMenuItem = links[i];
                break;
            }
        }

        if (matchingMenuItem) {
            matchingMenuItem.classList.add('active');
            var parent = matchingMenuItem.parentElement;

            /**
             * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3. 
             * We should come up with non hard coded approach
             */
            if (parent) {
                parent.classList.add('active');
                const parent2 = parent.parentElement;
                if (parent2) {
                    parent2.classList.add('in');
                }
                const parent3 = parent2.parentElement;
                if (parent3) {
                    parent3.classList.add('active');
                    var childAnchor = parent3.querySelector('.has-dropdown');
                    if (childAnchor) childAnchor.classList.add('active');
                }

                const parent4 = parent3.parentElement;
                if (parent4)
                    parent4.classList.add('in');
                const parent5 = parent4.parentElement;
                if (parent5)
                    parent5.classList.add('active');
            }
        }
    }

    render() {
        const isCondensed = this.props.isCondensed || false;

        return (
            <React.Fragment>
                <div className='left-side-menu' ref={node => this.menuNodeRef = node}>
                    {!isCondensed && <PerfectScrollbar><UserProfile /><SideNavContent /></PerfectScrollbar>}
                    {isCondensed && <UserProfile /> && <SideNavContent />}
                </div>
            </React.Fragment>
        );
    }
}

export default connect()(Sidebar);
