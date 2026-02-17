import { connection } from "../db/db.js"

const createUser = async(userData) =>{

    const {full_name, email, password_hash, phone, address, city} = userData

    const [result] =   await connection.query(
                            `INSERT INTO  users (full_name, email,  password_hash, phone, address, city)
                            VALUES (? , ? , ? , ? ,? ,? )`, [full_name, email, password_hash , phone, address, city]
                        );
    return result;
}

const findUserByEmail = async (email)=>{

    const [rows] = await connection.query(
        `SELECT * FROM users WHERE email = ?`, [email]
    );
    return rows[0]
}

const updateRefreshToken = async (user_id, refreshToken)=>{
    const [result] = await connection.query(
        `UPDATE users  SET refresh_token= ? 
         WHERE user_id = ?`, [refreshToken, user_id]
    )
    return result
}


export
{
    createUser,
    findUserByEmail,
    updateRefreshToken

}
