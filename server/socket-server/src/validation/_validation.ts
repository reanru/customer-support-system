import { ResponseError } from "../_class/ResponseError";

const validate = <T>(schema: any, request: T) => {
    const result = schema.validate(request, {
        abortEarly: false, // lanjutkan semua validasi, jika terdapat error
        allowUnknown: false // reject field yg tidak diketahui
    });

    if(result.error){
        // throw result.error;
        throw new ResponseError(400, result.error.message);
    }else{
        return result.value;
    }
}

export { validate }