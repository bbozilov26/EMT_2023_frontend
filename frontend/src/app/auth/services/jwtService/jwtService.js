import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import jwtDecode from "jwt-decode";
import jwtServiceConfig from "./jwtServiceConfig";
import { Buffer } from "buffer";
import UserRepository from "../../../main/apps/e-commerce/repositories/UserRepository";
import { useNavigate } from "react-router-dom";

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      UserRepository.register(data).then((response) => {
        const user = response.data;
        resolve(user);
        this.emit("onRegister", user);
        this.setSession(null);
      });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      const request = Buffer.from(`${email}:${password}`).toString("base64");
      localStorage.setItem("request", request);
      UserRepository.login(request).then((resp) => {
        const token = resp.data;
        const decodedToken = jwtDecode(token);
        localStorage.setItem("auth_token", token);
        this.setSession(token);
        const user = UserRepository.filteredUsers({
          email: email,
          enabled: true,
        }).then(({ data }) => data.find((user) => user.email === email));
        resolve(user);
        this.emit("onLogin", user);
      });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      const access_token = this.getAccessToken();

      if (access_token) {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          this.setSession(access_token);
          resolve(user);
        } else {
          this.logout();
          reject(new Error("Failed to login with token."));
        }
      } else {
        this.logout();
        reject(new Error("Failed to login with token."));
      }
    });
  };

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("jwt_access_token");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      localStorage.removeItem("request");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit("onLogout", "Logged out");
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return localStorage.getItem("auth_token");
  };
}

const instance = new JwtService();

export default instance;
