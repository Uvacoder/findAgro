import { useEffect, useState } from 'react'

// Router
import {useRouter} from 'next/router'

// AuthHoc
import AuthHoc from '../../hoc/authHoc'

// Product Model
import Product from '../../models/product'

// react hot toast
import { toast, Toaster } from 'react-hot-toast'


// Link 
import Link from 'next/link'



// init Dashboard
const Dashboard = ({ authUser }) => {

    // init router
    const router = useRouter()

    // init productList state 
    const [productList, setProductList] = useState([])


    // init selectedAd state 
    const [selectedAd, setSelectedAd] = useState("")


    // init useEffect
    useEffect(async () => {

        // check if authUser
        if (authUser && authUser._id) {

            // get all products
            const products = await Product.getAllProductByUserId(authUser._id)

            console.log(products.result)

            // update ProductList
            setProductList(products.result)

        }

    }, [authUser])



    // init deleteAd func
    const handleDeleteAd = async() => {
        
        // check if selectedAd
        if(selectedAd) {

            // delete Ads
            const response = await Product.deleteSingleProduct(selectedAd)

            // check if not success
            if(!response.success) {
                return toast.error("Oops! Failed to delete Ad")
            }


            // show success
            toast.success("Ad deleted successfully")


            // reload page 
            return router.reload()

        }

    }



    return (
        <>
            <Toaster/>
            <section className="pt-5">
                <div className="container">
                    <div className="row">
                        <h1 className="mb-3 fs-3 mb-5">Welcome, {`${authUser.firstName} ${authUser.lastName}`}</h1>

                        {productList.length > 0 ?
                            productList.map((product, index) => {
                                return <div key={index} className="col-md-3 mb-4">
                                    <div className="card h-100"><img className="card-img-top w-100 image-fluid" src={product.images[0].url} style={{ objectFit: "cover", maxHeight: 100 }} alt="courses" />
                                        <div className="card-body">
                                            <Link href={`/dashboard/product/${product._id}`}><h6 className="font-sans-serif fw-bold fs-md-0 fs-lg-0  text-truncate" style={{ cursor: "pointer" }} data-bs-toggle="tooltip" data-bs-placement="bottom" title={product.title}>{product.title}</h6></Link>
                                            <p className="fw-bold card-price">&#8358; {product.price}</p>
                                            <button onClick={() => setSelectedAd(product._id)} className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal"><svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-trash"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"></path>
                                                <path
                                                    fillRule="evenodd"
                                                    d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                ></path>
                                            </svg></button>
                                        </div>
                                    </div>
                                </div>
                            })
                            :

                            <p>Ads Empty</p>
                        }

                    </div>
                </div>


            </section>





            {/* Delete Modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Ad</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           Do you want to delete this Ad?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={() => handleDeleteAd()} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}



// export Dashboard
export default AuthHoc(Dashboard)
