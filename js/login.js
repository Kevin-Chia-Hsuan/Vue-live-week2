// 加入站點
const url = 'https:///vue3-course-api.hexschool.io';
// 加入個人 API Path
const path = 'kevinapog47138';

// 登入頁DOM
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const loginBtn = document.querySelector('#login');

// 登入方法
function login() {
  // console.log('成功觸發');
  const username = usernameInput.value;
  const password = passwordInput.value;
  const loginData = {
    username,
    password,
  };
  // console.log(loginData);
  // 發出登入請求
  axios
    .post(`${url}/admin/signin`, loginData)
    .then((res) => {
      console.log(res);
      if (res.data.success) {
        // const token = res.data.token;
        // const expired = res.data.expired;

        // 使用解構手法，因為res.data裡有token及expired
        const { token, expired } = res.data;
        console.log(token, expired);
        // 增加cookie
        document.cookie = `hexToken=${token};expired=${new Date(
          expired
        )}; path=/`;
        window.location = 'index.html';
      } else {
        swal('出錯了!', '登入失敗，請檢查帳號、密碼', 'error');
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// 登入按鈕監聽
loginBtn.addEventListener('click', login);
