// Websocket
const socket = io("http://localhost:4000", {
    withCredentials: false,
    transportationOptions: {
        polling: {
            extraHeaders: {
                "my-custom-header": "abcd",
            },
        },
    },
});