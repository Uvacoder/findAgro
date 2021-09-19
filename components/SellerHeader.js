// react
import { useEffect, useState } from 'react'


// CookieJs
import cookieJs from 'js-cookie'


// next Link
import Link from 'next/link'



// init Seller Header
const SellerHeader = ({authUser}) => {

    // init handleLogout
    const handleLogout = () => {

        // clear cookie 
        cookieJs.remove('agroAuth')

        // redirect user to homepage 
        return window.location.replace('/')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light sticky-top py-3 d-block" data-navbar-on-scroll="data-navbar-on-scroll">
                <div className="container">
                    <a className="navbar-brand fw-600 fs-lg-3" href="index.html">Find<span className="font-primary">Agro</span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"> </span></button>
                    <div className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto pt-2 pt-lg-0 font-base">
                            {/* Home */}
                            <li className="nav-item px-2"><Link href="/dashboard"><a className="nav-link active dashboard-nav">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    className="bi bi-house me-2 mb-1"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2 13.5V7h1v6.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V7h1v6.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5zm11-11V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z"
                                    ></path>
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 1.5a1 1 0 011.414 0l6.647 6.646a.5.5 0 01-.708.708L8 2.207 1.354 8.854a.5.5 0 11-.708-.708L7.293 1.5z"
                                    ></path>
                                </svg>
                                Dashboard</a></Link></li>


                            {/* Create Ads */}
                            <li className="nav-item px-2"><Link href="/dashboard/create-ad"><a className="nav-link dashboard-nav">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    className="bi bi-upload me-2 mb-1"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M.5 9.9a.5.5 0 01.5.5v2.5a1 1 0 001 1h12a1 1 0 001-1v-2.5a.5.5 0 011 0v2.5a2 2 0 01-2 2H2a2 2 0 01-2-2v-2.5a.5.5 0 01.5-.5z"></path>
                                    <path d="M7.646 1.146a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8.5 2.707V11.5a.5.5 0 01-1 0V2.707L5.354 4.854a.5.5 0 11-.708-.708l3-3z"></path>
                                </svg>Create Ads</a></Link></li>


                            {/* Profile */}
                            <li className="nav-item px-2"><Link href="/dashboard/profile"><a className="nav-link dashboard-nav">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                    className="bi bi-person me-2 mb-1"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm2-3a2 2 0 11-4 0 2 2 0 014 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                                </svg>
                                View Profile</a></Link></li>

                        </ul>




                        <button onClick={() => handleLogout()} type="button" className="btn btn-primary ms-2 order-1 order-lg-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="currentColor"
                                className="bi bi-box-arrow-right me-2 mb-1"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 12.5a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v2a.5.5 0 001 0v-2A1.5 1.5 0 009.5 2h-8A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h8a1.5 1.5 0 001.5-1.5v-2a.5.5 0 00-1 0v2z"
                                ></path>
                                <path
                                    fillRule="evenodd"
                                    d="M15.854 8.354a.5.5 0 000-.708l-3-3a.5.5 0 00-.708.708L14.293 7.5H5.5a.5.5 0 000 1h8.793l-2.147 2.146a.5.5 0 00.708.708l3-3z"
                                ></path>
                            </svg>Logout</button>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default SellerHeader
