const User = require("./model");
const {hashData, verifyHashedData} = require("./../../util/hashData");
const createToken = require("./../../util/createToken")

const authenticateUser = async (data) => {
    try {
        const {email, password} = data;
        const fetchedUser = await User.findOne({email});

        if(!fetchedUser){
            throw Error("Inavalid credentials")
        }
        if(!fetchedUser.verified){
            throw Error("Not verified, check your inbox");
        }

        const hashedPassword = fetchedUser.password;
        const passwordMatch = await verifyHashedData(password, hashedPassword);

        if(!passwordMatch){
            throw Error("Invalid Password")
        }

        const tokenData = {userId: fetchedUser._id, email}
        const token = await createToken(tokenData);

        fetchedUser.token = token;
        return fetchedUser;
    } catch (error) {
        throw error;
    }
}
 
const createNewUser = async (data) => {
    try{
        const {name, email, password} = data;

        //check if user exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw Error("User with this email alreadt exists");
        }

        //hash password
        const hashedPassword = await hashData(password);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        const creaetedUser = await newUser.save();
        return creaetedUser;
    }catch(error){
        throw error;
    }
}

module.exports = {createNewUser, authenticateUser}