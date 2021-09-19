import React from 'react'


// Link
import Link from 'next/link'

// init Header component
const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light sticky-top py-3 d-block" data-navbar-on-scroll="data-navbar-on-scroll">
                <div className="container">
                    <Link href="/"><a className="navbar-brand fw-600 fs-lg-3">Find<span className="font-primary">Agro</span></a></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"> </span></button>
                    <div className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
                        {/* <ul className="navbar-nav ms-auto pt-2 pt-lg-0 font-base">
                            <li className="nav-item px-2"><a className="nav-link active" aria-current="page" href="index.html">Home</a></li>
                            <li className="nav-item px-2"><a className="nav-link" aria-current="page" href="pricing.html">Pricing</a></li>
                            <li className="nav-item px-2"><a className="nav-link" aria-current="page" href="web-development.html">Web Development</a></li>
                            <li className="nav-item px-2"><a className="nav-link" aria-current="page" href="user-research.html">User Research</a></li>
                        </ul> */}
                        
                        
                        
                        <a className="btn btn-primary order-1 order-lg-0 ms-auto" href="#"  data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
                        <a className="btn btn-primary ms-2 order-1 order-lg-0" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Register</a>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
