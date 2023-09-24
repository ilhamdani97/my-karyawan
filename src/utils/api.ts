import axios from "axios";
import { snackBar } from "./snackbar";
import { Cookies } from "react-cookie";
import { auth } from "@/utils/listApi/auth";
import { master } from "@/utils/listApi/master";
import { company } from "@/utils/listApi/company";
import { approval } from "@/utils/listApi/approval";
import { subscribe } from "./listApi/subscribe";
import { device } from "./listApi/device";
import { workflow } from "@/utils/listApi/workflow";
import { payroll } from "@/utils/listApi/payroll";

export const API = {
    auth,
    master,
    company,
    approval,
    subscribe,
    device,
    workflow,
    payroll,
}

interface PropsRequest {
    url?: string;
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    payload?: any;
    params?: any;
    responseType?: any;
}
export const axiosRequest = async ({
    url,
    method,
    payload,
    params,
    responseType,
}: PropsRequest) => {
    const cookies = new Cookies();
    const token = cookies.get('token');

    try {
        const response = await axios(
            {
                method: method,
                url: url,
                data: payload,
                headers: {
                    Authorization: `Bearer ${token || null}`
                },
                params,
                responseType,
            }
        );

        if (response.data.isError)
            snackBar('error', 'Oops, have a trouble')

        return response;
 
     } catch (e: any) {

        if (e.response === undefined) {
            snackBar('error', 'Oops, have a trouble')
        }

        if ([400].includes(e.response.status)) {
            snackBar('error', e.response.data.message)
        }
        
        if ([401, 403, 500].includes(e.response.status)) {
            
            cookies.remove('token');
            snackBar('error', e.response.data);

            if ([401].includes(e.response.status)) {
                window.location.replace('/signin');
            }
        }
       
     }
}
