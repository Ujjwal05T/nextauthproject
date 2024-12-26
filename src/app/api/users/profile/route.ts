import {connect} from '@/dbConfig/dbConfig'
import {NextRequest,NextResponse} from 'next/server'
import {getDataFromToken} from '@/helpers/getDataFromToken'
import User from '@/models/userModels';

connect()

export async function GET(request:NextRequest) {
    try{
        const userId = await getDataFromToken(request)
        //password will not be selected coz of select and '-' sign
        const user = User.findOne({_id:userId}).select('-password')
        if(!user){
            return NextResponse.json({error:"User not found"},{status:400})
        }
        return NextResponse.json({data:user,message:"User Found"},{status:200})

    }
    catch(error:any){
        return NextResponse.json({error: error.message},{status:500})
    }
}