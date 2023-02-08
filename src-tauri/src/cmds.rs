use crate::utils::set_wallpaper::set_wallpaper;
use std::fs::File;
use std::io::prelude::*;
use tauri::api::path::picture_dir;

#[tauri::command(async)]
pub async fn download_image(url: &str) -> Result<String, String> {
    let mut file_path;
    match picture_dir() {
        Some(v) => file_path = v,
        _ => return Err("Picture Dir 获取失败".to_string()),
    }

    let file_name: Vec<&str> = url.split('/').collect();
    let file_name = file_name.last().unwrap();

    file_path.push(file_name);

    let mut file = match File::create(&file_path) {
        Ok(v) => v,
        Err(_) => return Err("文件创建失败".to_string()),
    };

    let res = match match reqwest::get(url).await {
        Ok(res) => res,
        Err(_) => return Err("Request请求出错".to_string()),
    }
    .bytes()
    .await
    {
        Ok(v) => v,
        Err(_) => return Err("bytes error!".to_string()),
    };
    match file.write(&res) {
        Ok(_) => {
            let file_str = file_path.to_str().unwrap().to_string();
            return Ok(file_str);
        }
        Err(_) => return Err("文件写入出错".to_string()),
    }
}

#[tauri::command(async)]
pub async fn set_as_wallpaper(url: &str) -> Result<(), String> {
    let file = match download_image(url).await {
        Ok(v) => v,
        Err(e) => return Err(e),
    };
    set_wallpaper(&file)
}
