// bcrypt
import bcrypt from 'bcryptjs'


// init hashPassword func
const hashPassword = async(password, salt = 10) => {
    try {

        // generate salt
        const genSalt = await bcrypt.genSalt(salt)

        // generate hash
        const hash = await bcrypt.hash(password, genSalt)


        //return hash
        return hash


    } catch (error) {
        return false
    }
}




// init comparePassword
const comparePassword = async(password, hash) => {
    try {


        // init isMatch
        const isMatch = await bcrypt.compare(password, hash)

        // return 
        return isMatch


    } catch (error) {
        return false
    }
}











// init passwordUtil
const passwordUtil = {
    hashPassword,
    comparePassword
}




// export 
export default passwordUtil