import {NextResponse} from "next/server";
import CryptoJS from "crypto-js";

export async function POST(request){

    const {amount, encryptedAmount} = await request.json();
    console.log(amount, encryptedAmount);

    try{
        const decryptedAmount = CryptoJS.AES.decrypt(encryptedAmount,process.env.PAYMENT_TOKEN_SECRET).toString(CryptoJS.enc.Utf8);
        console.log(decryptedAmount);
        if (amount === parseInt(decryptedAmount)){
            return NextResponse.json({message: "Amount verified successfully", isOk: true}, {status: 200});
        }else{
            return NextResponse.json({message: "Invalid Amount"}, {status: 400});
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({message: "payment verification failed", isOk: false}, {status: 500});
    }
}

