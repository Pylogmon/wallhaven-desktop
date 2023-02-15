import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';

let config = {};

export function readConfig() {
    readTextFile('config.json', { dir: BaseDirectory.AppConfig }).then(
        async content => {
            config = JSON.parse(content);
        },
        e => { console.log(e) }
    )

}

export function get(name, dft) {
    if (name in config) {
        return config[name]
    } else {
        return dft
    }
}

export function set(key, value) {
    config[key] = value;
}

export function writeConfig() {
    writeTextFile(
        'config.json',
        JSON.stringify(config),
        { dir: BaseDirectory.AppConfig }
    ).then(
        _ => { },
        e => { console.log(e) }
    )
}


