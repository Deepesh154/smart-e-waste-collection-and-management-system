import bcrypt from "bcrypt"

const hashPassword= async(sentPassword)=>{
    return await bcrypt.hash(sentPassword, 10)
}

const isPasswordCorrect = async function (sentPassword, password_hash) {
  return await bcrypt.compare(sentPassword , password_hash)
}

export { hashPassword, isPasswordCorrect }