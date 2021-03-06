import React, {Component} from 'react';
import {Link} from "react-router-dom";

/**
 * @author Natasha Stojanova (natashastojanova6@gmail.com)
 */
class Header extends Component {
    handleChange = (e) => {
        this.props.searchTerm(e.target.value)
    };

    render() {
        return (
            <div>
                <nav className="navbar-expand-lg navbar navbar-light bg-warning">
                    <a target="_blank" rel="noopener noreferrer"
                       href="https://github.com/Konstantin-Bogdanoski/VSA"
                       className="btn btn-dark">
                        <i className="fa fa-github"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/"><i className="fa fa-home"/><span
                                    className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login"><i className="fa fa-sign-in"/></Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input onChange={this.handleChange} className="form-control mr-sm-2 border-danger"
                                   type="search" placeholder="Let's find something interesting"
                                   aria-label="Search" id="searchBar"/>
                        </form>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;