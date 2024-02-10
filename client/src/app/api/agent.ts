import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

// This is just basically formatting axios so the code when using axios is much cleaner
// Also centralizing thhe request for axios.

axios.defaults.baseURL = 'http://localhost:5243/api/';

const responseBody = (response: AxiosResponse) => response.data;

// just create a 1 sec delay when getting data from server with axios.
const delay = () => new Promise(resolve => setTimeout(resolve, 500))

axios.interceptors.response.use(async response => {
    await delay();
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            // This is just to get the value in the key value pairs of data.errors in Validation Error
            // "Problem1":"This is the first error". This is to get the "This is the first error", etc
            if (data.errors) {
                const modelStateErrors: string[] = []
                for (const key in data.errors) {
                    modelStateErrors.push(data.errors[key])                    
                }
                // flat is getting the value in the key value pairs
                throw modelStateErrors.flat()
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}})
            break;
        default:
            break;
    }
    return Promise.reject(error.response)
})

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => request.get('Products'),
    details: (id: number) => request.get(`Products/${id}`),
} 

const TestErrors = {
    get404Error: () => request.get('Buggy/not-found'),
    get400Error: () => request.get('Buggy/bad-request'),
    get401Error: () => request.get('Buggy/unauthorized'),
    getValidationError: () => request.get('Buggy/validation-error'),
    get500Error: () => request.get('Buggy/server-error'),
}

const agent = {
    Catalog,
    TestErrors
}

export default agent