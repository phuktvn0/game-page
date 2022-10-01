const getGame = function (data) {
    const   listGames = document.querySelector(".display")
            listGames.innerHTML = "";
    
            for (let i = 0; i < data.data.length; i++) {   
                const game = document.createElement("div");
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
};

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

const renderGames = async () => {
    try {
        const response = await fetch("https://cs-steam-game-api.herokuapp.com/games");
        const data = await response.json();
        getGame(data);
    } catch (error) {
        console.log(error);
    }
};

renderGames();


const action = async () => {
    try {
        await getTagList();
        await renderGames();
        const a = Array.from(document.querySelectorAll('.tags'));
        a.forEach( (c) => {
            c.addEventListener("click", async (d) => {
                const text = document.querySelector('#textCenter');
                text.innerText = d.target.innerText;
                let url = `https://cs-steam-game-api.herokuapp.com/games?steamspy_tags=${d.target.innerText.toLowerCase()}&page=1&limit=20`
               
                const x = await fetch(url);
                const data = await x.json();
            
                getGame(data);
            })
        });

        const search = document.querySelector(".s-text");
        const btn = document.querySelector(".s-btn");
        btn.addEventListener("click", async (d) => {
            const text = document.querySelector("#textCenter");
            text.innerText = `Result: ${search.value}`;

            let url = `https://cs-steam-game-api.herokuapp.com/games?q=${search.value}`;
            
            const x = await fetch(url);
            const data = await x.json();

            getGame(data);
        });
    } catch (e) {
        console.log(e);
    }
};

action();


const renderDetailGame = async(appid) => {
    try {
        const listGames = document.querySelector(".display-box")
        listGames.innerHTML = "";
        const x = await fetch(`https://cs-steam-game-api.herokuapp.com/single-game/${appid}`);
        const dataGame = await x.json();
        // console.log(dataGame);
        
        const a = document.createElement('div');
        a.className = 'single-game';
        a.style = `'background-image: url(${dataGame.data.background})'`
        a.innerHTML = 
        `<p id="textCenter">${dataGame.data.name}</p>
        <div class="display">
            <div class="information">
                <img src="${dataGame.data.header_image} alt="">
                <p>${dataGame.data.description}</p>
            </div>
        </div>`;
        
        listGames.appendChild(a);

    } catch (e) {
        console.log(e)
    }
}


























