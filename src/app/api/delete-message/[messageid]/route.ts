import UserModel from '@/model/user';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbconnect'
import { User } from 'next-auth';
//import { Message } from '@/model/user';
//import { NextRequest } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function DELETE(
  request: Request,
 // { params }: { params: { messageid: string } }
 context: { params: { messageid: string } }
) {
  console.log("************")

  const {messageid} =  await context.params;
  console.log({messageid})
 
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User;
  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    console.log(`Deleting message with ID: ${messageid} by user: ${_user.email}`);
    const updateResult = await UserModel.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: new Object(messageid) } } }
    );

    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { message: 'Message not found or already deleted', success: false },
        
        { status: 404 }
      );
    }

    return Response.json(
      { message: 'Message deleted', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return Response.json(
      { message: 'Error deleting message', success: false },
      { status: 500 }
    );
  }
}
