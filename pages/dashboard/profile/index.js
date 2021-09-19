import { useState, useEffect, useRef } from 'react'

// Router
import {useRouter} from 'next/router'

// AuthHoc
import AuthHoc from '../../../hoc/authHoc'

// react hot toast
import { toast, Toaster } from 'react-hot-toast'

// filestack
import * as filestack from 'filestack-js'

// User modal
import User from '../../../models/users'

// init client
const client = filestack.init('AiW2ZzsYdQkaGyXsBvkSUz')






// init SellerProfile
const SellerProfile = ({ authUser }) => {

    // init router
    const router = useRouter()

    // init ProfileImage state 
    const [profileImage, setProfileIMage] = useState([])

    // init firstName state
    const [firstName, setFirstName] = useState("")

    // init lastName state 
    const [lastName, setLastName] = useState("")

    // init email
    const [email, setEmail] = useState("")

    // init phone state
    const [phone, setPhone] = useState("")


    // init userProfileRef
    const userProfileRef = useRef({})


    // init useEffect
    useEffect(async () => {

        // check if authUser
        if (authUser && authUser._id) {

            // get user
            const response = await User.getSingleUser(authUser._id)

            // check if not success
            if (!response.success) {
                return toast.error("Oops! User not found")
            }

            // update userProfileRef
            userProfileRef.current = response.result

            // update profile states
            setFirstName(response.result.firstName)
            setLastName(response.result.lastName)
            setEmail(response.result.email)
            setPhone(response.result.phone)
            setProfileIMage(response.result.profileImage || [])


        }


    }, [authUser])


    // init handleOpenWidget func
    const handleOpenWidget = () => {

        // init options
        const options = {
            maxFiles: 1,
            uploadInBackground: false,
            accept: ['image/*'],
            onOpen: () => console.log('opened!'),
            onUploadDone: (res) => {
                console.log("RESPONSE", res.filesUploaded)

                // update profileImage state
                setProfileIMage(res.filesUploaded)
            }
        };

        // open file picker
        client.picker(options).open()
    }



    // init handleUpdateProfile
    const handleUpdateProfile = async () => {

        // init profileData
        const profileData = {
            _id: userProfileRef.current._id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: userProfileRef.current.password,
            phone: phone,
            profileImage: profileImage
        }


       // update profile Data
       const response = await User.updateSingleUser(profileData._id, profileData)


       // check if error
       if(!response.result.ok) {
           return toast.error("Failed to update profile")
       }


      
       //show success toast
       toast.success("Profile updated successfully")


       // reload page 
       return router.reload()

    }

    return (
        <>
            <Toaster />
            <section className="pt-5">
                <div className="container">
                    <div className="row">
                        <h1 className="mb-5 fs-3">Update Profile</h1>

                        <form>
                            {/* First Name */}
                            <div className="mb-4">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} className="form-control" id="firstName" placeholder="First Name" />
                            </div>

                            {/* Last Name */}
                            <div className="mb-4">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} className="form-control" id="lastName" placeholder="Last Name" />
                            </div>

                            {/* Email Name */}
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} className="form-control" id="email" placeholder="Email Address" />
                            </div>

                            {/* Phone */}
                            <div className="mb-4">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} className="form-control" id="phone" placeholder="Phone Number" />
                            </div>



                            {/* profile image   */}
                            <div className="mb-4 d-grid gap-2">
                                {profileImage.length > 0 ? <button type="button" onClick={() => handleOpenWidget()} className="btn btn-outline-secondary p-3 upload-image-btn">{`Profile Image Added`}</button> :
                                    <button type="button" onClick={() => handleOpenWidget()} className="btn btn-outline-secondary p-3 upload-image-btn">Upload Profile Image</button>
                                }


                            </div>


                            <button type="button" onClick={() => handleUpdateProfile()} className="btn btn-primary">Update Profile</button>
                        </form>


                    </div>
                </div>
            </section>
        </>
    )
}

export default AuthHoc(SellerProfile)
