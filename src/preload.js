import {
    ipcRenderer,
    contextBridge
} from 'electron'

contextBridge.exposeInMainWorld("api", {
    startNmapScan: function (args) {
        ipcRenderer.send("start-nmap-scan", args);
    },
    onNmapScanFinish: function (func) {
        ipcRenderer.on("finish-nmap-scan", (event, ...args) => func(event, ...args));
    }
});