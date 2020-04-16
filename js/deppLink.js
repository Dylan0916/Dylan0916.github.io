const ol = document.getElementById("ol");
const urlSearchParams = new URLSearchParams(location.search);
let url = "https://sa.ssl.verybuy.tw";

switch (urlSearchParams.get("env")) {
  case "prod":
    url = "https://www.verybuy.cc";
    break;
  case "testing":
    url = "https://www-testing.verybuy.cc";
    break;

  default:
    break;
}

const displayList = [
  {
    title: "新款韓國東大門香水瓶百搭數字大牌耳環耳釘流蘇格子蝴蝶結耳飾品",
    url: `${url}/user_submit/item/71681`,
    text: "user_submit item",
  },
  {
    title: "925純銀 複古 泰銀 白菜 發財 招財 男/女士款 項鏈 吊墜 項墜",
    url: `${url}/recommend/item/1409712`,
    text: "recommend item",
  },
  {
    title: "搜尋：連衣裙",
    url: `${url}/search/user_submit/%E9%80%A3%E8%A1%A3%E8%A3%99`,
    text: "search list",
  },
  {
    title: "搜尋：褲子",
    url: `${url}/search/user_submit/%E8%A4%B2%E5%AD%90`,
    text: "search list",
  },
  {
    title: "搜尋：竹節棉 (with utm)",
    url: `${url}/search/user_submit/%E7%AB%B9%E7%AF%80%E6%A3%89/top/4374096?utm_source=line&utm_medium=message&utm_campaign=mgm&utm_term=20200326`,
    text: "search list",
  },
  {
    title: "user_submit item 短網址",
    url: `https://bit.ly/2K1gjfA`,
    text: "https://bit.ly/2K1gjfA",
  },
  {
    title: "Scheme",
    url: `verybuy201109://`,
    text: "verybuy201109://",
  },
  {
    title: "user_submit list",
    url: `${url}/user_submit/list`,
    text: "user_submit list",
  },
  {
    title: "Top",
    url: `${url}/search/user_submit/%E7%89%9B%E4%BB%94/top/75003-74879-74882-73987-70527-68893-71284?utm_source=line&utm_medium=message&utm_campaign=regularWed&utm_content=image&utm_term=20190717&openExternalBrowser=1`,
    text: "Top",
  },
  {
    title: "團購主題頁 (app)",
    url: `${url}/tuango/theme/app/2019_1111_festival_campaign`,
    text: "團購主題頁 (app)",
  },
  {
    title: "團購主題頁 (no app)",
    url: `${url}/tuango/theme/2019_1111_festival_campaign`,
    text: "團購主題頁 (no app)",
  },
  {
    title: "Google",
    url: `https://www.google.com/`,
    text: "Google",
  },
];

const htmlContent = displayList.map(
  (item) => `
  <li>
    <p>${item.title}</p>
    <a href="${item.url}" target="_blank">${item.text}</a>
    <br>
  </li>
  `
);

ol.innerHTML = htmlContent.join("");
