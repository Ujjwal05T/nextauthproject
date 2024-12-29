import {connect} from '@/dbConfig/dbConfig'
import {NextRequest,NextResponse} from 'next/server'
import {getDataFromToken} from '@/helpers/getDataFromToken'
import User from '@/models/userModels';

connect()

export async function GET(request:NextRequest) {
    try{
        const userId = await getDataFromToken(request)
        //password will not be selected coz of select and '-' sign
        const user = await User.findOne({_id:userId}).select('-password')
        if(!user){
            return NextResponse.json({error:"User not found"},{status:400})
        }

        
        const safeUser = {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            isVerified: user.isVerified
        }

        return NextResponse.json({data:safeUser,message:"User Found"},{status:200})

    }
    catch(error:any){
        console.log('5')
        return NextResponse.json({error: error.message},{status:500})
    }
}