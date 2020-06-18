
const uiPort = 3000;
const servicePort = 8080;

const app = {
    uiEndPoint: `http://18.222.101.194:${uiPort}/`
    // uiEndPoint: `http://localhost:${uiPort}/`
    , serviceEndPoint: `http://52.14.195.214:${servicePort}/`
    //, serviceEndPoint: `http://localhost:${servicePort}/`
}

export default app;