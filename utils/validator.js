// isEmail
import isEmail from 'validator/lib/isEmail';

// isMobile
import isMobilePhone from 'validator/lib/isMobilePhone'


// init register validation function
const register = (regData) => {

    // validate
    if (!regData.email) {
        return "Email is required"
    }

    if (!isEmail(regData.email)) {
        return "Please enter a valid email"
    }

    if (!regData.password) {
        return "Password is required"
    }

    if (!regData.firstName) {
        return "First Name is required"
    }

    if (!regData.lastName) {
        return "Last Name is required"
    }



    if (!regData.phone) {
        return "Phone is required"
    }

    if (!isMobilePhone(regData.phone)) {
        return "Please enter a valid phone number"
    }

}






// validate login
const login = (loginData) => {
    // validate 
    if (!loginData.email) {
        return "Email is required"
    }

    if (!isEmail(loginData.email)) {
        return "Please enter a valid email"
    }

    if (!loginData.password) {
        return "Password is required"
    }
}





// validate product data
const createAds = (productData) => {

    // validate
    if (!productData.title) {
        return "Title is required"
    }

    if (!productData.price) {
        return "Price is required"
    }

    if (!productData.description) {
        return "Description is required"
    }

    if (!productData.category) {
        return "category is required"
    }

    if (productData.images.length === 0) {
        return "Please upload atleast 1 image"
    }

}



// init validator
const validator = {
    register,
    login,
    createAds
}



// export validator
export default validator