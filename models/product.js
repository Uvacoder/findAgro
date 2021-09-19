// pouchdb
import PouchDb from 'pouchdb'

// pouchdb find
import pouchdbFind from 'pouchdb-find'

// add plugin
PouchDb.plugin(pouchdbFind)


// // enable debugging
// PouchDb.debug.enable('*')


// create a collection 
const productDb = new PouchDb('products')




// init createProduct function
const createProduct = async(productData) => {
    try {

        // store product 
        const doc = await productDb.put(productData)


        // return response
        return { success: true, result: doc }

    } catch (error) {
        // return error
        return { success: false, error: error }
    }

}




// // init getAll Products function
const getAllProducts = async() => {
    try {

        // get all products in productsDb
        const doc = await productDb.allDocs({ include_docs: true, attachments: true })

        // return success
        return { success: true, result: doc }


    } catch (error) {
        return { success: false, error: error }
    }

}




// init getSingleProduct function
const getSingleProduct = async(productId) => {
    try {

        // get product by Id
        const doc = await productDb.get(productId)

        // return success
        return { success: true, result: doc }


    } catch (error) {
        return { success: false, error: error }
    }
}





// init deleteSingleProduct function
const deleteSingleProduct = async(productId) => {
    try {

        // find product by id
        const doc = await productDb.get(productId)

        // check if not product
        if (doc.status === 404) {
            return { success: false, error: "Product does not exist" }
        }

        // delete product
        await productDb.remove(doc)


        // return 
        return { success: true, result: "Product deleted successfully" }


    } catch (error) {
        return { success: false, error: error }
    }
}



// // init updateSingleProduct function
const updateSingleProduct = async(productId, productData) => {
    try {


        // find product by id
        const doc = await productDb.get(productId)

        // check if not product
        if (doc.status === 404) {
            return { success: false, error: "Product does not exist" }
        }


        // if product, then update product
        const updatedDoc = await productDb.put({ _id: doc._id, _rev: doc._rev, ...productData })


        // return success
        return { success: true, result: updatedDoc }


    } catch (error) {
        return { success: false, error: error }
    }
}




// init getall product by userId
const getAllProductByUserId = async(userId) => {
    try {

        // find product  by userId
        const doc = await productDb.find({ selector: { userId: userId } })


        // return success
        return { success: true, result: doc.docs }


    } catch (error) {
        return { success: false, error: error }
    }
}



// init Product
const Product = {
    createProduct,
    deleteSingleProduct,
    getSingleProduct,
    getAllProductByUserId,
    updateSingleProduct,
    getAllProducts
}


// export User helper functions
export default Product