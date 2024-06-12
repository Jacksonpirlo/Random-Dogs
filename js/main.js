const API_DOG_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=3';
const API_DOG_SAVE_FAVORTE_MICHI = 'https://api.thedogapi.com/v1/favourites?api_key=live_EyLRQ91CV2lEo23LcgLwxETjbzEiaa4H0un5CM9uu2AVZNbYfbarOBy2NANW2wij';
const API_URL_FAVOTITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=live_EyLRQ91CV2lEo23LcgLwxETjbzEiaa4H0un5CM9uu2AVZNbYfbarOBy2NANW2wij`;
const API_DOG_UPLOAD = 'https://api.thedogapi.com/v1/images/upload';


async function randomDog() {
    const res = await fetch(API_DOG_RANDOM);
    const data = await res.json();
    console.log('Random')
    console.log(data);

    if (res.status !== 200) {
        console.log('Ocurrio un error');
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const bnt1 = document.getElementById('btn-random-michi-1');
        const btn2 = document.getElementById('btn-random-michi-2');
        const btn3 = document.getElementById('btn-random-michi-3');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        bnt1.onclick = () => saveFavoriteMichi(data[0].id);
        btn2.onclick = () => saveFavoriteMichi(data[1].id);
        btn3.onclick = () => saveFavoriteMichi(data[2].id);
    }
}

async function loadFavoriteMichi () {
    const res = await fetch(API_DOG_SAVE_FAVORTE_MICHI);
    const data = await res.json();
    console.log('Favorite');
    console.log(data);

    if (res.status !== 200) {
        console.log('Ocurrio un error');
    } else {
        const section = document.getElementById('perrosFavoritos');
        section.innerHTML = "";

        data.forEach (michi => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar de favoritos');

            img.src = michi.image.url;
            img.width ='200';
            img.height = '220';
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavoriteMichi(michi.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

async function saveFavoriteMichi(id) {
    const res = await fetch(API_DOG_SAVE_FAVORTE_MICHI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json();

    console.log('Save');
    console.log(res);

    if (res.status !== 200) {
        console.log('Error!');
    } else {
        console.log('Michi Guardado en favoritos');
        loadFavoriteMichi();
    }
}

async function deleteFavoriteMichi(id) {
    const res  = await fetch(API_URL_FAVOTITES_DELETE(id), {
        method: 'DELETE',
    });
    const data = await res.json();

    if (res.status !== 200) {
        console.log('Error in delete');
    } else {
        console.log('Michi eliminado de favoritos');
        loadFavoriteMichi();
    }
}

async function uploadMyMichi() {
    const form = document.getElementById('formularioPerrito');
    const formDta = new FormData(form);
    console.log(formDta.get('file'))
    
    const res = await fetch(API_DOG_UPLOAD, {
        method: 'POST',
        headers: {
            'X-API-KEY': 'live_EyLRQ91CV2lEo23LcgLwxETjbzEiaa4H0un5CM9uu2AVZNbYfbarOBy2NANW2wij'
        },
        body: formDta,
    })

    const data = await res.json();

    if (res.status !== 201) {
        console.log('Error');
    }
    else {
        console.log("Foto de michi cargada :)");
        console.log({ data });
        console.log(data.url);
        saveFavoriteMichi(data.id);
    }
}

randomDog();
loadFavoriteMichi();