const User = require("./../user/model");
const {sendOTP, verifyOTP, deleteOTP} = require("./../otp/controller");

const verifyUserEmail = async ({email, otp}) => {
    try {
        const validOTP = await verifyOTP({email, otp});
        if(!validOTP){
            throw Error("No OTP found");
        }
        await User.updateOne({email}, {verified:true});
        await deleteOTP(email);
        return;
    } catch (error) {
        throw error; 
    }
}

const sendVerificationOTPEmail = async (email) => {
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser){
            throw Error("No existing user")
        }

        const OTPDetails = {
            email,
            subject: "Email Verification",
            message: "Verify your email with the code below",
            duration: 1
        }

        const createdOTP = await sendOTP(OTPDetails);
        return createdOTP;
    } catch (error) {
        throw error;
    }
}

module.exports = {sendVerificationOTPEmail, verifyUserEmail};