const express = require("express");
const router = express.Router();
const {createNewUser, authenticateUser} = require("./controller");
const auth = require("./../../middleware/auth");
const {sendVerificationOTPEmail} = require("./../email_verification/controller")

router.get("/private_data", auth, (req,res) => {
    res.status(200).send(`Private territory of ${req.currentUser.email}`);
})

router.post("/", async (req, res) => {
    try {
        let {email, password} = req.body;
        email.trim();
        password.trim();
        if(!(email&&password)){
            throw Error("Input credentials");
        }
        const authenticatedUser = await authenticateUser({email, password});
        res.status(200).json(authenticatedUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post("/signup", async (req, res) => {
    try {
        let {name, email, password} = req.body;
        name = name.trim();
        email = email.trim();
        password = password.trim();
        
        //checking if any values are undefined
        if(!(name && email && password)){
            throw Error("Empty input fields");
        }
        //checking if name consists only of alphabets and whitespaces
        else if(!/^[a-zA-Z ]*$/.test(name)){
            throw Error("Invalid name");
        }
        //checking structure of email
        else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            throw Error("Invalid email");
        }
        else if(password.length < 8){
            throw Error("Password is too short")
        }
        //Good credentials
        else{
            const newUser = await createNewUser({
                name,
                email,
                password,
            });
            await sendVerificationOTPEmail(email);
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;