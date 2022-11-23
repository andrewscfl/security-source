const nmap = require('node-nmap')


export function handleFullScan(host) {
    return new Promise((res, rej) => {
        const scanner = new nmap.NmapScan(host,'-A -Pn')
        scanner.on('complete', (data) =>res(data))
        scanner.on('error', (error) =>rej(error))
    })
}