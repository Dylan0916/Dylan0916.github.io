let auth0 = null;

const fetchAuthConfig = () =>
  fetch("./auth_config.json").then((resp) => resp.json());

const configureClient = async () => {
  const resp = await fetchAuthConfig();

  auth0 = await createAuth0Client({
    domain: resp.domain,
    client_id: resp.clientId,
  });
};

window.onload = async () => {
  // 初始化 auth
  await configureClient();

  // 登入的 function
  const login = async () => {
    // 使用者按下「登入」後，頁面轉到 Universal Login
    await auth0.loginWithRedirect({
      redirect_uri: "https://dylan0916.github.io/auto0-login",
    });
  };

  // 登出的 function
  const logout = () => {
    auth0.logout({
      returnTo: "https://dylan0916.github.io/auto0-login",
    });
  };

  // login button
  const loginBtn = document.getElementById("login");

  loginBtn.addEventListener("click", login);

  // logout button
  const logoutBtn = document.getElementById("logout");

  logoutBtn.addEventListener("click", logout);

  // 登入後的當下，把網址中的參數替換掉
  const query = window.location.search;
  const pathname = window.location.pathname;

  if (query.includes("code=") && query.includes("state=")) {
    // 執行登入後的動作
    await auth0.handleRedirectCallback();

    // 清掉網址參數
    window.history.replaceState({}, document.title, pathname);
  }

  // 確認是否登入，執行頁面的切換
  updateUI();
};

// 頁面切換的 function
const updateUI = async () => {
  // 確認是否登入，會回傳 true, false
  const isAuthenticated = await auth0.isAuthenticated();

  // 登入
  if (isAuthenticated) {
    // 登入後，要做什麼
    let accessToken = await auth0.getTokenSilently(); // 取得 access_token
    const user = await auth0.getUser(); // 取得登入者資訊

    // 隱藏登入區塊
    const loginWrap = document.querySelector(".card-wrap.log");
    loginWrap.classList.add("d-none");

    // 打開卡片區塊
    const cardWrap = document.querySelector(".card-wrap.logged");
    cardWrap.classList.remove("d-none");

    let emailVerify;
    user.email_verified ? (emailVerify = "已驗證") : (emailVerify = "尚未驗證");

    const card = `
      <div class="card">
        <div class="alert text-center">
          <img src="${user.picture}">
          <h2>${user.nickname}</h2>
        </div>
        <div class="info">
          <p>註冊信箱：${user.email}</p>
          <p>信箱是否驗證：${emailVerify}</p>
          <p>令牌 Token：${accessToken}</p>
          <h6>最後更新時間：${user.updated_at}</h6>
        </div>
      </div>
    `;
    cardWrap.insertAdjacentHTML("afterbegin", card);
  } else {
    console.log("未登入");
    // 未登入時，要做什麼
  }
};
