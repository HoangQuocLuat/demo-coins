const axios = require("axios");
const axiosRetry = require("axios-retry").default;
const { AXIOS_CONFIG } = require("../../config/axios");

function createAxiosInstance(baseURL, headers = {}) {
    const instance = axios.create({
        baseURL,
        timeout: AXIOS_CONFIG.TIMEOUT,
        headers,
    });

    axiosRetry(instance, {
        retries: AXIOS_CONFIG.RETRY,
        retryDelay: (retryCount) => retryCount * 1000,
        retryCondition: (error) =>
            error.code === "ECONNABORTED" || (error.response && error.response.status >= 500),
    });

    instance.interceptors.request.use(config => {
        console.log(`[REQUEST] ${config.method.toUpperCase()} ${config.url}`);
        return config;
    });

    instance.interceptors.response.use(
        response => response,
        error => Promise.reject(error)
    );

    return instance;
}

module.exports = { createAxiosInstance };
