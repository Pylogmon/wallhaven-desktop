import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';

//TODO 完整的config用redux存储

export function readConfig() {
    readTextFile('config.json', { dir: BaseDirectory.AppConfig })
        .then(
            content => { /*写入redux*/ },
            err => { console.log(err) }
        )
}

export function get(name, dft) {
    if (name in this.settings) {
        return //读取redux中的数据
    } else {
        return dft
    }
}

export function writeConfig() {
    writeTextFile('config.json', JSON.stringify(/* redux中的数据 */), { dir: BaseDirectory.AppConfig })
        .then(
            () => { },
            (err) => { console.log(err) }
        )
}


