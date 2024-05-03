
// Method send phone code
export const sendPhoneCode = ( data ) => async (dispatch) =>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      "phone": data.phone
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    const response = await fetch("http://localhost:8080/api/v1/auth/verify-phone", requestOptions);
    const responseData = await response.json();
  
    if(response.ok){
      data.setCountdown(60);
      data.setCode(responseData.code);
      data.setMessage(responseData.message, null, null, true, true);
      data.setIsSending(false);
    }else if(response.status === 400){
      // Lỗi server(phone không hợp lệ hoặc đã đăng ký)
      data.setMessage(null, null, responseData.message || "Số điện thoại không hợp lệ", false, false);
      data.setIsSending(false);
    }else{
      // Lỗi server(Không gửi được code)
      data.setMessage(null, null, "Không gửi được code. vui lòng thử lại!", false, false);
      data.setIsSending(false);
    }
  };
  
  //-----------------------------------------------------------------------------------------
  
  // Method send email code
  export const sendEmailCode = ( data ) => async(dispatch) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      "email": data.email
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    const response = await fetch("http://localhost:8080/api/v1/auth/verify-email", requestOptions);
    const responseData = await response.json();
    if(response.ok){
      data.setCountdown(60);
      data.setEmailCode(responseData.code);
      data.setMessage(responseData.message, null, null, true, true);
      data.setIsSending(false);
    }else if(response.status === 400){
      // Lỗi server(email không hợp lệ hoặc đã đăng ký)
      data.setMessage(null, null, responseData.message || "Email không hợp lệ", false, false);
      data.setIsSending(false);
    }else{
      // Lỗi server(Không gửi được code)
      data.setMessage(null, null, "Không gửi được code. vui lòng thử lại!", false, false);
      data.setIsSending(false);
    }
  };
  
  
  //-----------------------------------------------------------------------------------------
  
  // Method send forgot password
  export const verifyForgotPassword = ( data ) => async(dispatch) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      "email": data.email
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    const response = await fetch("http://localhost:8080/api/v1/auth/forgot-password", requestOptions);
    const responseData = await response.json();
    if(response.ok){
      data.setCountdown(60);
      data.setCode(responseData.code);
      data.setMessage(responseData.message, null, null, true, true);
      data.setIsSending(false);
    }else if(response.status === 400){
      // Lỗi server(email không hợp lệ hoặc đã đăng ký)
      data.setMessage(null, null, responseData.message || "Email không hợp lệ", false, false);
      data.setIsSending(false);
    }else{
      // Lỗi server(Không gửi được code)
      data.setMessage(null, null, "Không gửi được code. vui lòng thử lại!", false, false);
      data.setIsSending(false);
    }
  };