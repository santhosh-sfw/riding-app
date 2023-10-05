const OTP = require("./model");
const generateOTP = require("../../util/generateOTP");
const sendEmail = require("../../util/sendEmail");
const {hashData, verifyHashedData} = require("./../../util/hashData")
const {AUTH_EMAIL} = process.env;

const deleteOTP = async (email) => {
    try {
        await OTP.deleteOne({email});
    } catch (error) {
        throw error;
    }
}

const verifyOTP = async ({email, otp}) => {
    try{
        if(!(email && otp)){
            throw Error("Fill input fields");
        }
        const otpMatchedRecord = await OTP.findOne({email});
        if(!otpMatchedRecord){
            throw Error("No records found");
        }

        const expiresAt = otpMatchedRecord;
        if(expiresAt < Date.now()){
            await OTP.deleteOne({email});
            throw Error("Code has expired");
        }

        const hashedOTP = otpMatchedRecord.otp;
        const validOTP = await verifyHashedData(otp, hashedOTP);
        return validOTP;
    }catch(error){
        throw error;
    }
}

const sendOTP = async ({email, subject, message, duration=1}) => {
    try {
        if(!(email&&subject&&duration)){
            throw Error("Fill input fields");
        }

        await OTP.deleteOne({email});

        const generatedOTP = await generateOTP();

        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p>${message}</p> <p style="color:tomato; font-size:25px; letter-spacing:2px;"> <b>${generatedOTP}</b></p>`
        };
        await sendEmail(mailOptions);
        const hashedOTP = await hashData(generatedOTP);
        const newOTP = await new OTP({
            email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 + duration,
        })

        const createdRecord = await newOTP.save();
        return createdRecord;
    } catch (error) {
        throw error;
    }
}

module.exports = {sendOTP, verifyOTP, deleteOTP};