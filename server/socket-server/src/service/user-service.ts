import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { validate } from "../validation/_validation";

type GetType = {
    search: string,
    page: number,
    size: number
}

const get = async (request: GetType) => {

    const skip = (request.page - 1) * request.size;

    const filters = [
        {
            name: {
                contains: request.search
            }
        }
    ];

    let users = await prismaClient.user.findMany({
        // where: {
        //     OR: filters
        // },
        take: request.size,
        skip: skip,
        // select: {
        //     id: true,
        //     username: true,
        //     name: true,
        // },
    });

    const totalItems = await prismaClient.user.count({
        // where: {
        //     OR: filters
        // }
    });

    return {
        data: users,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems/request.size)
        }
    }
}

export default {
    get,
}
