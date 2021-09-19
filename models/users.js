// pouchdb
import PouchDb from 'pouchdb'

// pouchdb find
import pouchdbFind from 'pouchdb-find'

// add plugin
PouchDb.plugin(pouchdbFind)


// // enable debugging
// PouchDb.debug.enable('*')


// create a collection 
const userDb = new PouchDb('users')




// init createUser function
const createUser = async(userData) => {
    try {

        // store user 
        const doc = await userDb.put(userData)


        // return response
        return { success: true, result: doc }

    } catch (error) {
        // return error
        return { success: false, error: error }
    }

}




// init getAllUsers function
const getAllUsers = async() => {
    try {

        // get all users in usersDB
        const doc = await userDb.allDocs({ include_docs: true, attachments: true })

        // return success
        return { success: true, result: doc }


    } catch (error) {
        return { success: false, error: error }
    }

}




// init getSingleUser function
const getSingleUser = async(docId) => {
    try {

        // get user by Id
        const doc = await userDb.get(docId)

        // return success
        return { success: true, result: doc }


    } catch (error) {
        return { success: false, error: error }
    }
}





// init deleteSingleUser function
const deleteSingleUser = async(userId) => {
    try {

        // find user by id
        const doc = await userDb.get(userId)

        // check if not user
        if (doc.status === 404) {
            return { success: false, error: "User does not exist" }
        }

        // delete user
        await userDb.remove(doc)


        // return 
        return { success: true, result: "User deleted successfully" }


    } catch (error) {
        return { success: false, error: error }
    }
}




// init updateUser function
const updateSingleUser = async(userId, userData) => {
    try {


        // find user by userId
        const doc = await userDb.get(userId)

        // check if not user
        if (doc.status === 404) {
            return { success: false, error: "User does not exist" }
        }


        // if user, then update data
        const updatedDoc = await userDb.put({ _id: doc._id, _rev: doc._rev, ...userData })


        // return success
        return { success: true, result: updatedDoc }


    } catch (error) {
        return { success: false, error: error }
    }
}




// init find user by email
const findUserByEmail = async(email) => {
    try {

        // find user by email
        const doc = await userDb.find({ selector: { email: email } })


        // return success
        return { success: true, result: doc.docs }


    } catch (error) {
        return { success: false, error: error }
    }
}



// init User
const User = {
    createUser,
    getAllUsers,
    deleteSingleUser,
    getSingleUser,
    updateSingleUser,
    findUserByEmail
}


// export User helper functions
export default User