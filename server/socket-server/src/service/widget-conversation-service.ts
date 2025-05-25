import { validate } from "../validation/_validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../_class/ResponseError";

const getDetail = async (visitorId: string) => {

    let conversations = await prismaClient.session.findFirst({
        where: {
            visitor_id: visitorId,
        },
        // ambil data relasi
        select: {
            id: true,
            assigned_to: true,
            messages: true
            // messages: {
            //     select: {
            //         content: true,
            //         created_at: true
            //     }
            // }
        }
    });

    if(!conversations){
        throw new ResponseError(404, "Visitor is not found");
    }

    return {
        data: conversations,
    }
}

export default {
    getDetail,
}
