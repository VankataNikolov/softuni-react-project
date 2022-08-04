const baseUrl = 'http://localhost:5000/books';

export const create = async (bookData, accessToken) => {
    try {
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                'X-Authorization': accessToken,
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });

        return response;
    } catch (error) {
        console.log(error);
    }
}

export const update = async (bookId, bookData, accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/${bookId}`, {
            method: 'PUT',
            headers: {
                'X-Authorization': accessToken,
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });

        return response;
    } catch (error) {
        console.log(error);
    }
}

export const like = async (user, bookId) => {
    try {
        const response = await fetch(`${baseUrl}/${bookId}/like`, {
            method: 'POST',
            headers: {
                'X-Authorization': user.accessToken,
                'content-type': 'application/json'
            },
        });

        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteBook = async (user, bookId) => {
    try {
        const response = await fetch(`${baseUrl}/${bookId}`, {
            method: 'DELETE',
            headers: {
                'X-Authorization': user.accessToken,
            },
        });

        return response;
    } catch (error) {
        console.log(error);
    }
}