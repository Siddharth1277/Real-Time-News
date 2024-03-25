// News API

const searchBtn = document.getElementById("searchBtn"); // enter input news.
const newsQuery = document.getElementById("newsQuery"); // click search.
const newsType = document.getElementById("newsType"); // news type(main div).
const newsdetails = document.getElementById("newsdetails"); // show news here.

// on load window fetch apple data.
window.onload = function () {
  newsType.innerHTML = "<h4>Headlines</h4>";
  fetchHeadlines();
};

// search news.
searchBtn.addEventListener("click", function () {
  newsType.innerHTML = "<h4>Search : " + newsQuery.value + "</h4>";
  fetchQueryNews();
});

// Get the current date
var today = new Date();
var yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

var year = yesterday.getFullYear();
var month = yesterday.getMonth() + 1; 
var day = yesterday.getDate();

month = month < 10 ? "0" + month : month;
day = day < 10 ? "0" + day : day;

var formattedDate = year + "-" + month + "-" + day;

console.log(formattedDate); // Output: e.g., "2024-02-19"

// HeadLine news.
const fetchHeadlines = async () => {
  var url =
    "https://newsapi.org/v2/everything?" +
    "q=Apple&" +
    "from="+
    formattedDate +
    "&" +
    "sortBy=popularity&" +
    "apiKey=e5c87b8865a34f3891f9ce4c53120f36";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.articles);
      displayNews(data.articles);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
};

// news Query fetch data.
const fetchQueryNews = async () => {
  console.log(newsQuery.value);
  newsdetails.innerHTML = ""; // make newsdetails div empty.

  if (newsQuery.value == null) {
    return;
  }

  var url =
    "https://newsapi.org/v2/everything?" +
    "q=" +
    newsQuery.value +
    "&" +
    "from=2024-02-19&" +
    "sortBy=popularity&" +
    "apiKey=5491bcb8060143cbb5ce8804aba44694";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data.articles);
      displayNews(data.articles);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
};

// display news.
function displayNews(APIdata) {
  console.log(APIdata);

  if (APIdata.length == 0) {
    newsdetails.innerHTML = "Data not found.";
    return;
  }

  APIdata.forEach((news) => {
    // console.log(news.title);

    var col = document.createElement("div");
    col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

    var card = document.createElement("div");
    card.className = "p-2";

    if (news.urlToImage) {
      var image = document.createElement("img");
      image.setAttribute("height", "matchparent");
      image.setAttribute("width", "100%");
      image.src = news.urlToImage;
      card.appendChild(image);

      var cardBody = document.createElement("div");

      var newsHeading = document.createElement("h5");
      newsHeading.className = "card-title";
      newsHeading.innerHTML = news.title;

      var dateHeading = document.createElement("h6");
      dateHeading.className = "text-primary";
      dateHeading.innerHTML = news.publishedAt;

      var discription = document.createElement("p");
      discription.className = "text-muted";
      discription.innerHTML = news.description;

      var link = document.createElement("a");
      link.className = "btn btn-dark";
      link.setAttribute("target", "_blank");
      link.href = news.url;
      link.innerHTML = "Read more";

      cardBody.appendChild(newsHeading);
      cardBody.appendChild(dateHeading);
      cardBody.appendChild(discription);
      cardBody.appendChild(link);

      card.appendChild(cardBody);

      col.appendChild(card);

      newsdetails.appendChild(col);
    }
  });
}

// back to top button
window.addEventListener("scroll", function () {
  var backToTopButton = document.getElementById("back-to-top-btn");
  if (window.scrollY > 300) {
    // Adjust the scroll position to show the button
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

document
  .getElementById("back-to-top-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
