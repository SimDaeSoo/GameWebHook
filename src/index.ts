import ServerApp from './ServerApp';

// express 서버.
const serverApp: ServerApp = new ServerApp();
serverApp.initialize();
serverApp.createServer();