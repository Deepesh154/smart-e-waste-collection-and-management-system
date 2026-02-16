import bcrypt from "bcrypt"
import { asyncHandler } from "../utils/asyncHandler.js";
import { createUser, findUserByEmail } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { hashPassword, isPasswordCorrect} from "../utils/password.util.js"

const registerUser = asyncHandler(async (req, res)=>{
    const {full_name, email, password, phone, address, city } =req.body

    if([email, password, full_name].some((field)=>{field?.trim() === ""})) {
        throw new apiError(400, "Full name , email and password are required")
    }

    if(
        !email.includes("@") ||
        !email.includes(".")||
        email.startsWith("(@") ||
        email.endsWith("@")
    ) {
        throw new apiError(400, "invalid email format")
    }

    const existingUser = await findUserByEmail(email)
    console.log(existingUser)
    
    if(existingUser) {
        throw new apiError(400, "Email already taken....!")
    }

    const  password_hash = await hashPassword(password)

    const result = await createUser({
        full_name, 
        email,
        password_hash,
        phone,
        address,
        city
    })

    res
    .status(200)
    .json(
        new apiResponse(200, result, "User registered successfully")
    )


})

const loginUser= asyncHandler(async(req, res)=>{
    
    const { email, password }= req.body

    if(!email || !password) {
        throw new apiError(400, "Email and password are requird")
    }

    const user = await findUserByEmail(email)

    if(!email){
        throw new apiError(404, "User not found")
    }

     if(!password) {
      throw new apiError(400, "Password is required")
   }

   const checkedPassword = await isPasswordCorrect(password, user.password_hash)

   if(!checkedPassword) {
    throw new apiError(401, "Invalid Password")
   }

   res
   .status(200)
   .json(
    new apiResponse(200, {
        userId: user.user_id,
        email: user.email,
        fullName: user.full_name
    }, "Login Successful")
   )

})

export {
    registerUser,
    loginUser,

}