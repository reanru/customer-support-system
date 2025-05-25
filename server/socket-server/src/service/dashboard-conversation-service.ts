import { validate } from "../validation/_validation";
import { prismaClient } from "../application/database";
// import { ResponseError } from "../_class/ResponseError";

type GetType = {
    agentId: string,
    page: number,
    size: number
}

const getList = async (request: GetType) => {

    const skip = (request.page - 1) * request.size;

    let conversations = await prismaClient.session.findMany({
        where: {
            assigned_to: request.agentId,
        },
        take: request.size,
        skip: skip,
        // ambil data relasi
        include: {
            messages: {
                orderBy: { created_at: 'desc' },
                take: 1
            }
        }
    });

    const totalItems = await prismaClient.session.count({
        where: {
            assigned_to: request.agentId,
        },
    });

    return {
        data: conversations,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems/request.size)
        }
    }
}

export default {
    getList,
}
