export const suggestions = {
    '21': {
        title: 'What should I do if port 21 is open?',
        content: 'Port 21 is generally reserved for FTP. This protocol allows for users to transmit files over the internet.',
        recommendation: 'If you are certain that you or another IT staff member are not utilizing FTP outside the network, it is safe to close this port on your firewall.'
    },
    '22': {
        title: 'What should I do if port 22 is open?',
        content: `Port 22 is generally reserved for SSH. This protocol allows users from outside the network to securely login to your server.`,
        recommendation: `If you are certain that you or any other IT staff member are not utilizing SSH for any reason outside the network, it is safe to close this port on your firewall.`
    },
    '25': {
        
    },
    '80' : {
        title: 'What should I do if port 80 is open?',
        content: `Port 80 is generally reserved for HTTP servers. These servers allow the internet to view websites and web content over the HTTP protocol.`,
        recommendation: `If you are certain that you or any other IT staff are not utilizing an internally hosted webserver, it is safe to close this port on the firewall.`
    },

}