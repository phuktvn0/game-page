let pageNumbers= [];
let tagValue = "";
let searchValue = "";
let pageValue = "page=1";
let url = "";


// render game
const renderGame = async (link) => {
    try {
        const   response = await fetch(link);
        const   data = await response.json();
        const   listGames = document.querySelector(".display")
                listGames.innerHTML = "";
    
                for (let i = 0; i < data.data.length; i++) {   
                    const game = document.createElement("div");
                    game.id = "game"
                    game.innerHTML = 
                        `<div class="img">
                            <img src="${data.data[i].header_image}" alt="">
                        </div>
                        <div class="infor">
                            <p>${data.data[i].name}</p>
                            <p>${data.data[i].price}$</p>
                        </div>`
                    game.addEventListener("click",() => renderDetailGame(data.data[i].appid))
                    listGames.appendChild(game);
                    }
    } catch (e) {
        console.log(e)
    }
};

renderGame("https://cs-steam-game-api.herokuapp.com/games?page=1&limit=20");


// render tags category
const getTagList = async () => {
    try {
        const response = await fetch("https://cs-steam-game-api.herokuapp.com/steamspy-tags");
        const data = await response.json();

        const listTag = document.querySelector('.tagList');
        listTag.innerHTML = "";
        data.data.forEach( (a, i) => {
            const Tag = document.createElement('div');
            Tag.innerHTML = `<div class = "tags" value="${data.data[i].name}">${data.data[i].name.toUpperCase()}</div>`

            listTag.appendChild(Tag);
        });
    } catch (e) {
        console.log(e);
    }
};

getTagList();


// get link from the page
const urlLink = async () => {
    try {
        await getTagList();
        const tagsList = Array.from(document.querySelectorAll('.tags'));
        tagsList.forEach( (tag) => {
            tag.addEventListener("click", async (d) => {
                const text = document.querySelector('#textCenter');
                text.innerText = d.target.innerText;
                tagValue = `steamspy_tags=${d.target.innerText.toLowerCase()}`
                url = `https://cs-steam-game-api.herokuapp.com/games?${tagValue}&page=1&limit=20`
                // console.log(url);
                renderGame(url);
                renderPageNumber(1);
                return tagValue;
            })
        });


        const search = document.querySelector(".s-text");
        const btn = document.querySelector(".s-btn");
        btn.addEventListener("click", async (d) => {
            const text = document.querySelector("#textCenter");
            text.innerText = `Result: ${search.value}`;
            searchValue = `q=${search.value}`;
            url = `https://cs-steam-game-api.herokuapp.com/games?${searchValue}&page=1&limit=20`;
            // console.log(url);
            renderGame(url);
            renderPageNumber(1);
            return searchValue;
        });

    } catch (e) {
        console.log(e);
    }
};

urlLink();

// page number
const renderPageNumber = (number) => {
    let page = document.getElementById("page");
    if (number < 2) {
        page.innerHTML = 
        `<button class="pageNumber">Back</button>
        <button class="pageNumber" style="background-color:red;">${number}</button>
        <button class="pageNumber">${number*1 + 1}</button>
        <button class="pageNumber">${number*1 + 2}</button>
        <button class="pageNumber">Next</button>`
    } else {
        page.innerHTML = 
        `<button class="pageNumber">Back</button>
        <button class="pageNumber">${number*1 - 1}</button>
        <button class="pageNumber" style="background-color:red;">${number}</button>
        <button class="pageNumber">${number*1 + 1}</button>
        <button class="pageNumber">Next</button>`
    }

    pageNumbers = Array.from(document.getElementsByClassName("pageNumber"))

    pageNumbers.forEach( (button) => {
        button.addEventListener("click",(btn) => {
            
            let value = btn.target.innerHTML;
            
            if (value === "Back") {
                if (number > 1) {
                    number = number*1 - 1;
                } else {
                    number = 1;
                }
            } else if (value === "Next") {
                number = number*1 + 1;
            } else {
                number = value;
            }
            renderPageNumber(number);
            
            if (tagValue) {
                url = `https://cs-steam-game-api.herokuapp.com/games?${tagValue}&page=${number}&limit=20`
                // console.log(url);
                renderGame(url);
            } else if (searchValue) {
                url = `https://cs-steam-game-api.herokuapp.com/games?${searchValue}&page=${number}&limit=20`
                // renderGame(url);
            } else {
                url = `https://cs-steam-game-api.herokuapp.com/games?page=${number}&limit=20`
                // console.log(url);
                renderGame(url);
            }
        })
    })

}

renderPageNumber(1);


const renderDetailGame = async(appid) => {
    try {
        page.innerHTML = "";
        const listGames = document.querySelector(".display-box")
        listGames.innerHTML = "";
        const x = await fetch(`https://cs-steam-game-api.herokuapp.com/single-game/${appid}`);
        const dataGame = await x.json();
        // console.log(dataGame);
        
        const a = document.createElement('div');
        a.className = 'single-game';
        
        a.innerHTML = 
        `<p id="textCenter">${dataGame.data.name}</p>
        <div class="display">
            <div class="information">
                <img src="${dataGame.data.header_image} alt="">
                <p>${dataGame.data.description}</p>
            </div>
        </div>`;
        
        listGames.appendChild(a);
        // renderPageNumber(1);
    } catch (e) {
        console.log(e)
    }
}

// renponsive mobile

// var b = 1;

// const menu = document.getElementById('mobile');
// menu.addEventListener('click', () => {
//     const a = document.getElementById('search-box');
    
//     if (b === 1) {
//         a.style.cssText = `display: block`
//         b = b + 1;
//         return b;
//     } else {
//         a.style.cssText = `display: none`
//         b = b - 1;
//         return b;
//     }
// })
























