
const uiPort = 3000;
const servicePort = 8080;

const app = {
    uiEndPoint: `http://3.16.109.39:${uiPort}/`
    // uiEndPoint: `http://localhost:${uiPort}/`
    , serviceEndPoint: `http://3.15.175.168:${servicePort}/`
    //, serviceEndPoint: `http://localhost:${servicePort}/`
}

export default app;