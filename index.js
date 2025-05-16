const access_key = "Wyxo4C97aEZsx1lzNOhxhpAfs07mFfKEL5yhgwP_nSc";

const formelement = document.querySelector("form");
const search_inputEL = document.getElementById("input");
const resultdiv = document.querySelector(".results");
const showMoreButtonEl = document.getElementById("show-more-button");


let page = 1;   


async function get_photos(){
    const search_term = search_inputEL.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${search_term}&client_id=${access_key}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
    resultdiv.innerHTML = "";
    }

    results.map((result) => {
        const imagewrapper = document.createElement("div");
        imagewrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.regular;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        
        imagewrapper.appendChild(image);
        imagewrapper.appendChild(imageLink);
        resultdiv.appendChild(imagewrapper);
      });
  page++;

  if (page > 1) {
    showMoreButtonEl.style.display = "block";
  }
}

formelement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  get_photos();
});

showMoreButtonEl.addEventListener("click", () => {
  get_photos();
});
 
