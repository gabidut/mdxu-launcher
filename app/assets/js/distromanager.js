const {DistributionAPI} = require('helios-core/common')
const ConfigManager = require('./configmanager')


let api;

(async () => {
    ConfigManager.load()
    console.log(ConfigManager.getAuthAccounts())
    if(ConfigManager.getAuthAccounts().length !== 0) {
        exports.REMOTE_DISTRO_URL = 'http://localhost:8080/provider.php?getdata=1&uids=' + Object.keys(ConfigManager.getAuthAccounts()).join(',')
    } else {
        exports.REMOTE_DISTRO_URL = 'http://localhost:8080/provider.php?getdata=1'
    }
    console.log(exports.REMOTE_DISTRO_URL)
    api = new DistributionAPI(
        ConfigManager.getLauncherDirectory(),
        null, // Injected forcefully by the preloader.
        null, // Injected forcefully by the preloader.
        exports.REMOTE_DISTRO_URL,
        false
    )
    api.getDistribution().then(distribution => {
        console.log(distribution)
    })
})()

exports.DistroAPI = api
