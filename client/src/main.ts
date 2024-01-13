import HTTP from "./config";
import { IState } from "./interface/book";
import { renderData } from "./utils/render";

// const bookItemsElement = document.getElementById("bookItems") as HTMLDivElement;
const searchByList = document.getElementById("searchByList") as HTMLDivElement;
const searchInputElement = document.getElementById("searchInput") as HTMLInputElement;
const navAvatar = document.getElementById("navAvatar") as HTMLElement;
const avatarDiv = document.getElementById("avatarDiv") as HTMLDivElement;
const prevElement = document.getElementById("prev") as HTMLDivElement;
const nextElement = document.getElementById("next") as HTMLDivElement;

//array for label
const searchLabel: string[] = ["By Book Name", "by Author Name", "by Keyword", "by Category"];

// let settingState = false;
let pageIndex = 0;
const itemsPerPage = 8;

if (pageIndex <= itemsPerPage) {
    prevElement.classList.add("hidden");
} else {
    prevElement.classList.remove("hidden");
}
//state for getting data query
const state: IState = {
    "By Book Name": false,
    "by Author Name": false,
    "by Keyword": false,
    "by Category": false,
};

//search value
let value = "";

//on load
window.addEventListener("load", async (): Promise<void> => {
    //fetching the data from the server
    const res = await HTTP.get(`/books?take=${itemsPerPage}&skip=${pageIndex}`);
    // console.log(res);
    if (res.status === 200) {
        console.log(res.data);
        renderData(res.data);
    }
});


//rendering the searchBy div
for (let i = 0; i < searchLabel.length; i++) {
    const div = document.createElement("div") as HTMLDivElement;
    div.classList.add("p-2", "flex", "gap-2", "bg-[#F3F3F3]", "shadow-lg", "rounded-md");

    const input = document.createElement("input") as HTMLInputElement;
    input.type = "checkbox";

    const label = document.createElement("label") as HTMLLabelElement;
    label.innerText = searchLabel[i];
    div.appendChild(input);
    div.appendChild(label);
    searchByList.appendChild(div);

    input.addEventListener("change", async () => {
        // console.log(searchLabel[i], input.checked);
        state[searchLabel[i]] = input.checked;
        console.log(state);
        // await getBook();
    });
}



//adding event listeners to the input field
searchInputElement.addEventListener("keydown", async (ev) => {
    if (ev.key === "Enter") {
        value = searchInputElement.value;
        console.log("enter is clicked", value);
        const res = await getBook();
        console.log(res);
        renderData(res.data);
    }
});

navAvatar.addEventListener("click", () => {
    avatarDiv.classList.add("hidden");
    console.log("navAvatar is clicked");
});

nextElement.addEventListener("click", () => {
    getnextIndexBook();
});

prevElement.addEventListener("click", () => {
    getPrevIndexBook();
});

async function getnextIndexBook() {
    pageIndex += 8;
    const res = await HTTP.get(`/books?take=${itemsPerPage}&skip=${pageIndex}`);
    console.log(res.data);
    renderData(res.data);
}

async function getPrevIndexBook() {
    pageIndex -= 8;
    const res = await HTTP.get(`/books?take=${itemsPerPage}&skip=${pageIndex}`);
    console.log(res.data);
    renderData(res.data);
}


/**
 * Get book data from the Backend api accoring to the search by options
 * 
 * @returns object[] //it returns the fetch data from the API
 */
function getBook() {
    let url = "";
    console.log("hello world", value);

    if (state["By Book Name"]) {
        url += `&name=${value}`;
    }
    if (state["by Author Name"]) {
        url += `&author=${value}`;
    }
    if (state["by Keyword"]) {
        url += `&keyword=${value}`;
    }
    if (state["by Category"]) {
        url += `&category=${value}`;
    }
    return HTTP.get("/books/getby?" + url);
}

