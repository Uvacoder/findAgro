import { useEffect, useState } from 'react'

// Router
import { useRouter } from 'next/router'

// Slider
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

// commaNumber
import commaNumber from 'comma-number'

// copy to clipboard
import copy from 'copy-to-clipboard';

// react hot toast
import { toast, Toaster } from 'react-hot-toast'


// Header
import Header from '../../components/Header'

// Product Model
import Product from '../../models/product'

// User Model
import User from '../../models/users'




// init product details component
const ProductDetails = () => {

    // init router
    const router = useRouter()

    // init productId
    const productId = router.query.id


    // init showPhoneNumber state
    const [showPhoneNumber, setShowPhoneNumber] = useState(false)


    // init product state 
    const [productData, setProductData] = useState({})

    // init productAuthor
    const [productAuthor, setProductAuthor] = useState({})

    // init productImages
    const [productImages, setProductImages] = useState([])

    // init useEffect 
    useEffect(async () => {

        // check if productId
        if (productId) {


            // get product by id
            const response = await Product.getSingleProduct(productId)


            // check if response
            if (response.success) {

                // get user
                const user = await User.getSingleUser(response.result.userId)

                console.log(user)

                // update ProductData
                setProductData(response.result)

                // update productAuthor
                setProductAuthor(user.success && user.result)



                // init product images
                const product_images = [...response.result.images]

                // init final_product_images
                const final_product_images = []

                // iterate through product images
                product_images.forEach((image) => {

                    // push to final_product_images
                    final_product_images.push(<img className="img-fluid" style={{ height: 400, width: "100%", objectFit: "cover" }} src={`${image.url}`} onDragStart={handleDragStart} />,)
                })


                // update productImage state 
                setProductImages(final_product_images)

            }
        }


    }, [productId])




    // init handleShowPhoneNumber
    const handleShowPhoneNumber = () => {

        //update setPhoneNumber
        setShowPhoneNumber(true)
    }


    // init handleCopyToClipboard
    const handleCopyToClipboard = (phoneNumber) => {

        // copy phoneNumber
        copy(phoneNumber)

        // show info Alert
        toast.success("Phone Number Copied successfully")

    }



    // init handleDragStart
    const handleDragStart = (e) => e.preventDefault();


    // init items
    const items = [...productImages]





    return (
        <>
            <Header />
            <Toaster />

            <section className="bg-600">

                <div className="container">
                    <div className="row">
                        <div className="col-md-8 ">
                            <AliceCarousel mouseTracking items={items} />

                            <h1 className="my-4">Description</h1>
                            <p>{productData.description}</p>


                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <h2 className="my-2 text-center price-text"><b>&#8358; {commaNumber(productData.price)}</b></h2>
                            </div>

                            <div className="card mt-4">
                               
                                    <div className="row">
                                        <div className="col-auto ms-3 py-2">
                                            <img className="img-fluid " style={{ height: 50, width: 50 }} src={productAuthor.profileImage ? productAuthor.profileImage[0].url : '/assets/img/profile.png'}></img>
                                        </div>
                                        <div className="col-auto px-0">
                                            <p className="mt-3 price-text"><b>{`${productAuthor.firstName} ${productAuthor.lastName}`}</b></p>

                                        </div>
                                    </div>
                                    <div className="row mb-3 px-2">
                                        <div className="col-sm-12 col-md-12">
                                            <div className="d-grid gap-2">
                                                {showPhoneNumber ? <button onClick={() => handleCopyToClipboard(productAuthor.phone)} className="btn btn-primary" type="button">{productAuthor.phone}</button> :
                                                    <button onClick={() => handleShowPhoneNumber()} className="btn btn-primary" type="button">Contact Seller</button>
                                                }


                                            </div>
                                        </div>
                                    </div>
                              
                            </div>
                        </div>
                    </div>
                </div>


            </section>

        </>
    )
}

export default ProductDetails
