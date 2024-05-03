import { counterSlice } from "../reducer/counterSlice";
import { Alert } from "../../components/Alert/Alert";


// Method login
export const login = (data) => (dispatch) => {
  try {
    const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // create data
  const raw = JSON.stringify({
    email: data.username,
    password: data.loginPassword,
  });

  // create request option
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  //fetch api
  fetch("http://localhost:8080/api/v1/auth/login", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw Error(response.status);
    })
    .then((result) => {
      // save token to localStorage
      localStorage.setItem('access_token', result.access_token);
      localStorage.setItem('refresh_token', result.refresh_token);

      dispatch(counterSlice.actions.increase());

      //set message to default
      data.setErrorLoginMessage("");
      
      if(data.toggleClosePopup){
        //Đóng Popup
        data.toggleClosePopup();
      }
      if(data.location){
        // const search = data.location.state?.search || '';
        // Kiểm tra nếu có thông tin trang trước đó, chuyển hướng lại đó sau khi đăng nhập thành công
        const from = data.location.state?.from?.pathname || '/'; data.navigate(from, { replace: true });
      }
      if(result.user.roles&&result.user.roles.includes("ROLE_ADMIN")){
        data.navigate("/admin-dashboard");
      }
      //Show thông báo
      Alert(1500, 'Đăng nhập', 'Đăng nhập thành công','success', 'OK');
    })
    .catch((error) => {
      data.setErrorLoginMessage("Tên tài khoản hoặc mật khẩu sai!");
    });
  } catch (error) {
    //Show thông báo
    Alert(2000, 'Đăng nhập', 'Không thể kết nối tới server','error', 'OK');
  }
};


// Method sign-up
export const signup = (data) => async (dispatch) => {
  try {
      if (!data.registerPassword || !data.confirmPassword ||
          !data.firstName || !data.lastName) {
        return data.setErrorRegisterMessage("Vui lòng nhập thông tin!");
      }

      if (data.registerPassword !== data.confirmPassword) {
        return data.setErrorRegisterMessage("Mật khẩu không khớp!");
      }

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
          email: data.username,
          password: data.registerPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          role: ["USER"],
      });

      const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
      };

      const response = await fetch("http://localhost:8080/api/v1/auth/register", requestOptions);
      const responseData = await response.json();

      if (response.ok) {
          data.setErrorRegisterMessage("");
          data.setIsVerify(false);
          data.setIsLogin(true);
          //Show thông báo
          Alert(1500, 'Đăng ký', 'Đăng kí thành công thành công. Mời bạn đăng nhập!','success', 'OK');
      } else {
        //Show thông báo
        Alert(1500, 'Đăng ký', responseData.message || 'Có lỗi xảy ra!' ,'error', 'OK');
      }
  } catch (error) {
    //Show thông báo
    Alert(1500, 'Đăng ký', error.message || 'Có lỗi xảy ra khi đăng ký!' ,'error', 'OK');
  }
};


// Method Logout
export const logout = (navigate) => async (dispatch) => {
  if (localStorage.getItem("access_token") != null) {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access_token")}`
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/v1/auth/logout", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch(counterSlice.actions.increase());
        navigate("/");
        Alert(1500, 'Đăng xuất', 'Đăng xuất thành công' ,'success', 'OK');
      })
      .catch((error) => {
        console.error(error);
        dispatch(counterSlice.actions.increase());
        // Alert(1500, 'Đăng xuất', 'Đăng xuất thất bại' ,'error', 'OK');
      });
  } else {
    Alert(2000, 'Đăng xuất', 'Bạn chưa đăng nhập!' ,'warning', 'OK');
  }
};


//-----------------------------------------------------------------------------------------
// Method changePass
export const changePassword = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("access_token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      oldPassword : data.oldpassword,
      newPassword : data.newpassword
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const response = await fetch("http://localhost:8080/api/v1/auth/change-password", requestOptions);
    const responseData = await response.json();

    if (response.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // save token to localStorage
      localStorage.setItem('access_token', responseData.access_token);
      localStorage.setItem('refresh_token', responseData.refresh_token);

      dispatch(counterSlice.actions.increase());
      data.setPasswordErrorMessage();
      data.setEditting(false);
      data.setInputDefault();
      Alert(1500, 'Đổi mật khẩu', responseData.message || "Thành công" ,'success', 'OK');
    } else {
        data.setPasswordErrorMessage(responseData.message || "Có lỗi xảy ra!");
    }
    }catch(error){
      Alert(2000, 'Đổi mật khẩu', error.message || "Thất bại" ,'error', 'OK');
  }
};


//-----------------------------------------------------------------------------------------
// Method reset password
export const resetPassword = (data) => async (dispatch) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: data.email,
      newPassword : data.newpassword
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const response = await fetch("http://localhost:8080/api/v1/auth/reset-password", requestOptions);
    const responseData = await response.json();

    if (response.ok) {
      data.setPasswordErrorMessage();
      data.setIsLogin(true);
      data.setIsForgotPassword(false);
      Alert(1500, 'Quên mật khẩu', responseData.message || "Thành công" ,'success', 'OK');
    } else {
        data.setPasswordErrorMessage(responseData.message || "Có lỗi xảy ra!");
    }
    }catch(error){
      Alert(2000, 'Quên mật khẩu', error.message || "Thất bại" ,'error', 'OK');
  }
};


//-----------------------------------------------------------------------------------------


// Method refresh token
export const refreshToken = async (dispatch) => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      Alert(2000, 'Thông báo', 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại', 'warning', 'OK');
    }else{
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${refreshToken}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch("http://localhost:8080/api/v1/auth/refresh-token", requestOptions);
      const responseData = await response.json();
      if (response.ok) {
        //xóa token đã hết hạn
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        //set lại token mới
        localStorage.setItem("access_token", responseData.access_token);
        localStorage.setItem("refresh_token", responseData.refresh_token);
        dispatch(counterSlice.actions.increase());
      }
      else{
        Alert(2000, 'Thông báo', 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại', 'warning', 'OK');

        //xóa token đã hết hạn
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        dispatch(counterSlice.actions.increase());
      }
    }
  } catch (error) {
    console.error(error);
  }
};





