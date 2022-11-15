import { IpcMain } from "electron";

export default function bindAll(){
    ipcMain.on('start-nmap-scan', (event, args) => {
        console.log(args)
    })
}





