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