// React
import { useEffect, useState, useRef } from 'react'

// Link
import Link from 'next/link'

// router
import { useRouter } from 'next/router'

// Header
import Header from '../components/Header'

// User model
import User from '../models/users'

// Product Model
import Product from '../models/product'

// react hot toast
import { toast, Toaster } from 'react-hot-toast'

// Cookie Js
import cookieJs from 'js-cookie'

// lodash
import _ from 'lodash'

// nanoid
import { customAlphabet } from 'nanoid'

// commaNumber
import commaNumber from 'comma-number'

// passwordUtil
import passwordUtil from '../utils/password'

// minisearch
import MiniSearch from 'minisearch'


// validator
import validator from '../utils/validator'


// init nanoid
const nanoid = customAlphabet('1234567890', 10)






// init Home component
const Home = () => {

  // init router
  const router = useRouter()


  // init productList state
  const [productList, setProductList] = useState([])

  // init searchText state 
  const [searchText, setSearchText] = useState("")

  // init productListRef
  const productListRef = useRef([])



  // init useEffect
  useEffect(async () => {

    // init completeProductList
    const completeProductList = []

    // get All Products
    const response = await Product.getAllProducts()

    // init product_list and copy all response
    const product_list = [...response.result.rows]


    // iterate through product list
    product_list.forEach((product) => {

      // init title
      const title = product.doc.title

      // init image 
      const images = product.doc.images

      // init price
      const price = product.doc.price

      // init category
      const category = product.doc.category

      // init createdAt
      const createdAt = product.doc.createdAt

      // init id
      const id = product.id

      // push to completeProductList
      completeProductList.push({ id: id, createdAt: createdAt, title: title, category: category, images: images, price: price })

    })


    // update productListRef
    productListRef.current = completeProductList

    // update productList
    setProductList(completeProductList)

    console.log(response.result.rows)
    console.log("Complete Product List", completeProductList)


  }, [])

  // instantiate minisearch
  let miniSearch = new MiniSearch({
    fields: ['title', 'category'],
    storeFields: ['title', 'category', 'images', 'price', 'createdAt']
  })

  // Index all documents
  miniSearch.addAll(productListRef.current)

  // init registerData state 
  const [registerData, setRegisterData] = useState({
    regEmail: "",
    regPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
  })


  // init loginData
  const [loginData, setLoginData] = useState({
    loginEmail: "",
    loginPassword: ""
  })


  // destructure registerData
  const { regEmail, regPassword, firstName, lastName, phoneNumber } = registerData

  // destructure loginData 
  const { loginEmail, loginPassword } = loginData




  // init handleChangeRegister
  const handleChangeRegister = (data) => (event) => {

    // update registerData state
    setRegisterData({ ...registerData, [data]: event.target.value })


  }

  // init handleChangeLogin
  const handleChangeLogin = (data) => (event) => {

    // update loginData state 
    setLoginData({ ...loginData, [data]: event.target.value })

  }






  // init handleRegSubmit
  const handleRegSubmit = async () => {


    // init regData 
    const regData = {
      _id: nanoid(),
      email: regEmail,
      password: regPassword,
      firstName: firstName,
      lastName: lastName,
      phone: phoneNumber,
      isAdmin: false
    }



    // validate registerData
    const error = validator.register(regData)

    // check if error
    if (error) {
      return toast.error(error)
    }


    // encrypt password
    const hashPassword = await passwordUtil.hashPassword(regData.password)


    // update password field in regData
    regData['password'] = hashPassword


    // check if user exist by email
    const userDoc = await User.findUserByEmail(regData.email)


    // if user
    if (userDoc.result.length > 0) {
      console.log(userDoc)
      return toast.error("user with email already exist")
    }

    // if no user, then create user
    const createResponse = await User.createUser(regData)


    // return success
    if (!createResponse.result.ok) {
      return toast.error("Oops! unable to create account")
    }


    // save email in cookie 
    cookieJs.set('agroAuth', regData.email)


    // return success
    toast.success("Account created successfully")

    // redirect user to dashboard
    return window.location.href = '/dashboard'

  }






  // init handleSubmitLogin
  const handleSubmitLogin = async () => {

    // init loginData
    const loginData = {
      email: loginEmail,
      password: loginPassword
    }



    // validate loginData
    const error = validator.login(loginData)


    // check if error
    if (error) {
      return toast.error(error)
    }


    // check if user exist by email
    const userDoc = await User.findUserByEmail(loginData.email)


    // if not user
    if (userDoc.result.length === 0) {
      return toast.error("Invalid email and password")
    }



    // if user, then compare password
    const isMatch = await passwordUtil.comparePassword(loginData.password, userDoc.result[0].password)


    // check if not isMatch
    if (!isMatch) {
      return toast.error("Invalid email and password")
    }


    // save email in cookie 
    cookieJs.set('agroAuth', userDoc.result[0].email)


    // return success
    toast.success("Login successful")


    // redirect user to dashboard
    return window.location.href = '/dashboard'

  }




  // init handlesSearch
  const handleSearch = (search_text) => {

    console.log(productList)

    // check if search_text
    if (search_text) {

      // search 
      let results = miniSearch.search(search_text, { prefix: true })

      // update productList state 
      setProductList(results)

    } else {

      // update productList state
      setProductList(productListRef.current)
    }

  }



  // init handleFilterCategory
  const handleFilterCategory = (filterText) => {

    // check if filterText
    if (filterText) {

      // search 
      let results = miniSearch.search(filterText, { prefix: true })

      // update productList state 
      setProductList(results)

    } else {

      // update productList state
      setProductList(productListRef.current)
    }

  }



  // init handleFilterPrice
  const handleFilterPrice = (price_text) => {

    // check if price_text  
    if(price_text === 'cheapest') {

      // filter cheapest
      const result = [...productListRef.current.sort((a, b) => Number(a.price) - Number(b.price))]

      
      // update product list
      setProductList(result)


    } else {

      // filter expensive

      const result = [...productListRef.current.sort((a, b) => Number(b.price) - Number(a.price))]

      // update productList state
      setProductList(result)
    }


  }




  return (
    <>
      <Header />
      <Toaster />

      <section className="pb-11 pt-7 bg-600">

        <div className="container mb-6">
          <h1 className="fs-2 mb-4 text-center">Find Agro Products Easily</h1>
          {/* Search Bar */}
          <div className="row mb-6">
            <div className="col-md-3">
              <img className="img-fluid" src="/assets/img/cockhen.png" alt="hero-header" />
            </div>
            <div className="col-md-6 col-lg-6 col-sm-6">
              <input type="text" onChange={(event) => handleSearch(event.target.value)} className="form-control p-2" id="search" placeholder="Search Here..." />
            </div>

            <div className="col-md-3">
              <img className="img-fluid" src="/assets/img/catfish.png" alt="hero-header" />
            </div>
          </div>



          <div className="row">
            <div className="col-12">


              <form className="row g-3">
                {/* Filter Categories */}
                <div className="col-sm-6 col-md-6">
                  <label className="form-label" htmlFor="inputCategories">Categories</label>
                  <select onChange={(event) => handleFilterCategory(event.target.value)} className="form-select" id="inputCategories">
                    <option value="">All</option>
                    <option value="farm_machinery">Farm Machinery &amp; Equipments</option>
                    <option value="feeds_supplements_seeds">Feeds, Supplements &amp; Seeds</option>
                    <option value="livestock_poultry">Live Stock &amp; Poultry</option>
                    <option value="drinks">Drinks</option>
                  </select>
                </div>

                {/* Price */}
                <div className="col-sm-6 col-md-6">
                  <label className="form-label" htmlFor="inputLevel">Price</label>
                  <select onChange={(event) => handleFilterPrice(event.target.value)} className="form-select" id="inputLevel">
                  <option value="">Filter by price</option>
                    <option value="cheapest">Cheapest</option>
                    <option value="expensive">Expensive</option>
                  </select>
                </div>

               
                
                {/* <div className="col-auto z-index-2">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div> */}
              </form>
            </div>
          </div>
        </div>



        <div className="container mt-6">
          <div className="row">

            {productList.length > 0 ?
              productList.map((product, index) => {
                return <div key={index} className="col-md-3 mb-4">
                  <div className="card h-100"><img className="card-img-top w-100" src={product.images[0].url} alt="courses" />
                    <div className="card-body">
                     <Link href={`/ads/${product.id}`}><h5 className="font-sans-serif fw-bold fs-md-0 fs-lg-0 text-truncate" style={{ cursor: "pointer" }} data-bs-toggle="tooltip" data-bs-placement="bottom" title={product.title}>{product.title}</h5></Link>
                      <p className="fw-bold card-price">&#8358; {commaNumber(product.price)}</p>
                    </div>
                  </div>
                </div>
              })

              :

              <p className="text-center">No Products Available</p>
            }




          </div>
        </div>



      </section>


      {/* Footer */}
      <p className="text-center fs-0 text-default">&copy; Copyright. Designed and Developed by Jazz </p>




      <div className="modal fade modal-style" id="registerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content modal-style">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create Account</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  {/* Email */}
                  <input type="email" onChange={handleChangeRegister('regEmail')} value={regEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Address" />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                {/* Password */}
                <div className="mb-3">

                  <input type="password" onChange={handleChangeRegister('regPassword')} value={regPassword} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>


                {/* First Name */}
                <div className="mb-3">

                  <input type="text" className="form-control" id="firstName" onChange={handleChangeRegister('firstName')} value={firstName} placeholder="First Name" />
                </div>


                {/* Last Name */}
                <div className="mb-3">

                  <input type="text" onChange={handleChangeRegister('lastName')} value={lastName} className="form-control" id="lastName" placeholder="Last Name" />
                </div>

                {/* Phone Number */}
                <div className="mb-3">

                  <input type="number" onChange={handleChangeRegister('phoneNumber')} value={phoneNumber} className="form-control" id="phone Number" placeholder="Phone Number" />
                </div>
              </form>
            </div>
            <div className="modal-footer">

              <button onClick={() => handleRegSubmit()} type="button" className="btn btn-primary">Register</button>
            </div>
          </div>
        </div>
      </div>







      {/* LOGIN MODAL */}
      <div className="modal fade modal-style" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content modal-style">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Login</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  {/* Email */}
                  <input type="email" onChange={handleChangeLogin('loginEmail')} value={loginEmail} className="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Email Address" />

                </div>

                {/* Password */}
                <div className="mb-3">
                  <input type="password" onChange={handleChangeLogin('loginPassword')} value={loginPassword} className="form-control" id="loginPassword" placeholder="Password" />
                </div>

              </form>
            </div>
            <div className="modal-footer">

              <button onClick={() => handleSubmitLogin()} type="button" className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}






export default Home