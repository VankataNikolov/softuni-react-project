const baseUrl = 'http://localhost:5000/users';

export const getMyStuff = async (userId, accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/${userId}/stuff`, {
            headers: {
                'X-Authorization': accessToken,
                'content-type': 'application/json'
            },
        });

        return response;
    } catch (error) {
        console.log(error);
    }
};
