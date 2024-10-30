import joi from 'joi'

// validation for add docter
const addDocterVal=joi.object({
    spesialization: joi.string().min(2).max(20).required(),
    userId:joi.string().hex().length(24).required(),
    image:joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().valid('image/png','image/jpeg','image/jpg').required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required()
    }),
    // createdBy: joi.string().hex().length(24).required(),
    // updatedBy: joi.string().hex().length(24).required()
})


//validation for update docter
const updateDocterVal=joi.object({
    spesialization: joi.string().min(2).max(20).required(),
    userId:joi.string().hex().length(24).required(),
    image:joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().valid('image/png','image/jpeg','image/jpg').required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required()
    }),
})
export  {addDocterVal,updateDocterVal}