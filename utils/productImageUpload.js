// import react
import { useState } from 'react'

// import react hot toast
import toast, { Toaster } from 'react-hot-toast';



// init ProductImageUpload
const ProuctImageUpload = (props) => {


   

    return (
        <>
            <Toaster />

            <button type="button" className="btn btn-outline-secondary mt-3 text-secondary upload-image-btn" onClick={() => handleOpenUploadWidget()}>Upload Product</button>

        </>
    )
}











// export
export default ProuctImageUpload
