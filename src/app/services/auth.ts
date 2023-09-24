import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/interface/auth";
import { API, axiosRequest } from "@/utils/api";

export async function login(payload: LoginRequest) {
    
    const response = await axiosRequest({
        method: 'POST',
        url: API.auth.login,
        payload
    })

    return response?.data || null;

}

export async function register(payload: RegisterRequest) {
    const response = await axiosRequest({
        method: 'POST',
        url: API.auth.register,
        payload
    })

    return response?.data || null;
}