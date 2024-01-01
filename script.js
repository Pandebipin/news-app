let API_KEY = "c649274fadf1496f8e12bcd5bc113bff";
let url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchMedia("nepal"));
async function fetchMedia(query) {
  const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
  console.log(data);
}
function bindData(articles) {
  const cardContainer = document.querySelector("#cards-container");
  const template = document.querySelector("#template");

  cardContainer.innerHTML = "";
  for (let article of articles) {
    if (!article.urlToImage) continue;
    const cardColone = template.content.cloneNode(true);
    fillDataInCard(cardColone, article);
    cardContainer.appendChild(cardColone);
  }
}
function fillDataInCard(cardColone, article) {
  const newsImg = cardColone.querySelector("#news-img");
  const newsSource = cardColone.querySelector("#news-source");
  const newsDescription = cardColone.querySelector("#news-description");
  const newsTitle = cardColone.querySelector("#news-tittle");
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/kathmandu",
  });
  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsSource.innerHTML = article.source.name + ".   " + date;
  newsDescription.innerHTML = article.description;
  cardColone.querySelector(".card").addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
curSelect = null;
function clickItem(id) {
  fetchMedia(id);
  const navItem = document.getElementById(id);
  curSelect?.classList.remove("active");
  curSelect = navItem;
  curSelect.classList.add("active");
}
const searchText = document.querySelector("#search-text");
const button = document.querySelector(".button");
button.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchMedia(query);
});
