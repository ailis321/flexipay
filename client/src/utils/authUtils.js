export function decodeJwt(token) {
    console.log("Decoding token:", token);
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decoded = JSON.parse(jsonPayload);
        console.log("Decoded payload:", decoded);
        return decoded;
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}
