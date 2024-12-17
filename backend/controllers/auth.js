import {db} from "../db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    const q = "SELECT * FROM kullanici WHERE eposta = ?"

    db.query(q, [req.body.eposta], (err, data) => {
        if (err) return res.status(400).json(err)
        if (data.length) return res.status(409).json("User already exists!")

        const q = "INSERT INTO kullanici (`eposta`,`sifre`,`calisanlar_id`,`rol_id`) VALUES (?)"
        bcrypt.hash(req.body.sifre, 10, (err, hash) => {
            if(err) return res.status(400).json(err);
            const values = [
                req.body.eposta,
                hash,
                req.body.calisanlar_id,
                req.body.rol_id,
            ]
            db.query(q, [values], (err, data) => {
                if (err) return res.status(400).json(err)
                return res.status(200).json({Status: "Success"});
            })
        })
    })
}

export const login = (req, res) => {
    const {eposta, sifre} = req.body
    const q = "SELECT * FROM kullanici WHERE eposta = ?"
    db.query(q, [req.body.eposta], (err ,data) => {
        if (err) {throw err}
        if (!data.length) return res.status(404).json("User not found")
        if (data.length>0) {
            bcrypt.compare(sifre, data[0].sifre, (err, response) => {
                if(err) return res.json({password: err})
                if(response) {
                    const token = jwt.sign({role: data[0].role_id, calisan_id: data[0].calisan_id}, "jwt-secret-key", {expiresIn: "1d"})
                    return res.json({Status: "Success", Token: token})
                }else{
                    return res.json({Status: "Email or password invaild"})
                }
            })
        }else{
            return res.json({Status: "Error"})
        }
    })
}

export const logout = (req, res) => {
    
}