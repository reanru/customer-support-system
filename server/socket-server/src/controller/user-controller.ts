import userService from "../service/user-service"

const get = async (req:any, res:any, next:any) => {
    try {
        const request = {
            search: req.query.search ?? "",
            page: Number(req.query.page),
            size: Number(req.query.size),
        }

        // console.log('check ', typeof request.page, typeof request.size);

        const result = await userService.get(request);

        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export default {
    get
}