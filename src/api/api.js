import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "4569929c-d096-4f9a-99c0-776cb748d962"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1 , pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
        .then (response => {
            return response.data;
        });
    },

    follow(userId) {
        return instance.post(`follow/${userId}`, {})
        .then(response => {
            return response.data;
        })
    },
    getProfile(userId) {
        console.warn("Please use ProfileAPI Object");
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
        .then(response => {
            return response.data;
        })
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(file) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put(`profile/photo`, formData, {
            'Content-Type': 'multipart/form-data'
        })
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile);
    }
}

export const authAPI = {
    getAuthMe() {
        return instance.get(`auth/me`)
        .then(response => {
            return response.data;
        })
    },

    login(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {
            email, password, rememberMe, captcha
        });
    },

    logout() {
        return instance.delete('auth/login');
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}



