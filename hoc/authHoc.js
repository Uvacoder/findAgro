// React
import { useEffect } from 'react'

// Cookie js
import cookieJs from 'js-cookie'

// user model helpers
import User from '../models/users'

// Router
import { useRouter } from 'next/router'

// useState 
import { useState } from 'react'


// SellerHeader
import SellerHeader from '../components/SellerHeader'





// init AuthHoc
const AuthHoc = (Component) => {
    return ((props) => {

        // init authUser
        const [authUser, setAuthUser] = useState({})

        // init loading state 
        const [loading, setLoading] = useState(true)

        // init router
        const router = useRouter()

        // init useEffect
        useEffect(async () => {

            // get email from cookie
            const email = cookieJs.get('agroAuth')


            // check if not email
            if (!email) {
                // return user to home page
                return window.location.replace('/')

            }


            // check if user exist in database
            const userDoc = await User.findUserByEmail(email)


            // check if no user 
            if (userDoc.result.length === 0) {

                // return user to home page
                return window.location.replace('/')
            }

            console.log(userDoc.result[0])

            // update loading state 
            setLoading(false)

            // update authUser state
            setAuthUser(userDoc.result[0])

        }, [])

        return (
            <>
                {loading ?<section className="w-100"  style={{height: "100vh", display: 'grid', justifyContent: 'center', alignContent: 'center'}}> 
                <div className="text-center">
                    <div className="spinner-border" role="status" >
                        <span className="visually-hidden" >Loading...</span>
                    </div>
                </div></section> :
                    <>
                        <SellerHeader authUser={authUser} />
                        <Component {...props} authUser={authUser} />

                    </>
                }

            </>
        )

    })
}

export default AuthHoc
