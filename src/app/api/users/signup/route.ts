import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModels'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        //Validation code - to be written here
        console.log(reqBody)
        const user= await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User Already Exist"},{status:400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPass = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:hashedPass
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        //send verification mail here
        //._id gives id in mongoDB
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({
            message:"User Registered Successfully",
            success:true,
            savedUser
        })

    } catch(error:any){
        return NextResponse.json({error: error.message},{status:500})
    }
}