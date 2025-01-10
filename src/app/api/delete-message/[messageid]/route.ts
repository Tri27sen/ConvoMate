import dbConnect from "@/lib/dbconnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/user";
import { type NextRequest } from 'next/server'

type Props = {
  params: { messageid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function DELETE(request: Request, props: Props) {
  try {
    const messageId = props.params.messageid;
    await dbConnect();
    const session = await getServerSession(authOptions);

    const user: User = session?.user as User;

    if (!session || !session.user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Not authenticated"
        }),
        { status: 401 }
      );
    }

    try {
      const updatedMessage = await UserModel.updateOne(
        { _id: user._id },
        { $pull: { message: { _id: messageId } } }
      );

      if (updatedMessage.modifiedCount === 0) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Message not found"
          }),
          { status: 404 }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Message deleted successfully"
        }),
        { status: 200 }
      );

    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Failed to delete message"
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error"
      }),
      { status: 500 }
    );
  }
}
