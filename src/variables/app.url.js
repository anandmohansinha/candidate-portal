
const uiPort = 3000;
const servicePort = 8080;

const app = {
    uiEndPoint: `http://18.222.101.194:${uiPort}/`
    // uiEndPoint: `http://localhost:${uiPort}/`
    , serviceEndPoint: `http://3.15.175.16:${servicePort}/`
    //, serviceEndPoint: `http://localhost:${servicePort}/`
}

export default app;