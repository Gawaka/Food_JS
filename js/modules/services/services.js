const postData = async (url, data)=> {    // func настраивает наш запрос, посылает его на сервер
    const res = await fetch(url, {       // async await для того что бы асинхкод отработал правильно
        method: 'POST',                 //ответ от сервера приходит асинхронно
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();      // //получает ответ от сервера и трансфит его в json
};

const getResource = async (url)=> {    // // Получение карточек с сервера
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch${url}, status: ${res.status}`); // // покажет ошибку и статус
    }

    return await res.json();      // //получает ответ от сервера и транфит его в json
};

export {postData, getResource};