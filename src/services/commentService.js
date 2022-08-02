const baseUrl = 'http://localhost:5000/books';

export const create = async(accessToken, bookId, commentData) => {
    try {
        const response = await fetch(`${baseUrl}/${bookId}/comment`, {
            method: 'POST',
            headers: {
                'X-Authorization': accessToken,
                'content-type': 'application/json'
            },
            body: JSON.stringify(commentData)
        });

        return response;
    } catch (error) {
        console.log(error);
    }
}