use std::fs;
use tauri::api::path::config_dir;

pub fn check_config_file() {
    const APPID: &str = "cn.pylogmon.wallhavenDesktop";
    let mut app_config_dir_path = match config_dir() {
        Some(v) => v,
        None => todo!(),
    };
    app_config_dir_path.push(APPID);
    let mut app_config_file_path = app_config_dir_path.clone();
    app_config_file_path.push("config.json");

    if !app_config_file_path.exists() {
        if !app_config_dir_path.exists() {
            fs::create_dir_all(app_config_dir_path).unwrap();
        }
        fs::File::create(app_config_file_path).unwrap();
    }
}
