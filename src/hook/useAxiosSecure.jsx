import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/provider/AuthContext";

const axiosInstanceSecure = axios.create({
    baseURL: "https://super-server-3.onrender.com",
});

const useAxiosSecure = () => {
    const { user, signOutUser } = useContext(AuthContext);

    useEffect(() => {
        // 👉 Request interceptor: inject token
        const requestInterceptor = axiosInstanceSecure.interceptors.request.use(
            (config) => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // 👉 Response interceptor: check 401/403
        const responseInterceptor = axiosInstanceSecure.interceptors.response.use(
            (res) => res,
            (err) => {
                const status = err?.response?.status;

                if (status === 401 || status === 403) {
                    console.warn("Unauthorized → signing out...");
                    signOutUser();
                }

                return Promise.reject(err);
            }
        );

        // 👉 Cleanup: remove interceptors when component unmounts
        return () => {
            axiosInstanceSecure.interceptors.request.eject(requestInterceptor);
            axiosInstanceSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user, signOutUser]);

    return axiosInstanceSecure;
};

export default useAxiosSecure;
