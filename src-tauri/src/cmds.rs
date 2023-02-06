use crate::utils::set_wallpaper::set_wallpaper;
use std::fs::File;
use std::io::prelude::*;
use tauri::api::path::picture_dir;

#[tauri::command(async)]
pub async fn download_image(url: &str) -> Result<String, &str> {
    let mut file_path;
    match picture_dir() {
        Some(v) => file_path = v,
        _ => return Err("error"),
    }

    let file_name: Vec<&str> = url.split('/').collect();
    let file_name = file_name.last().unwrap();
    //file_path.push("wallhaven");
    file_path.push(file_name);

    let mut file = match File::create(&file_path) {
        Ok(v) => v,
        Err(_) => return Err("file create failed"),
    };

    let res = match match reqwest::get(url).await {
        Ok(res) => res,
        Err(_) => return Err(""),
    }
    .bytes()
    .await
    {
        Ok(v) => v,
        Err(_) => return Err(""),
    };
    match file.write(&res) {
        Ok(_) => {
            let file_str = file_path.to_str().unwrap().to_string();
            return Ok(file_str);
        }
        Err(_) => return Err(""),
    }
}

#[tauri::command(async)]
pub async fn set_as_wallpaper(url: &str) -> Result<String, &str> {
    let file = download_image(url).await.unwrap();
    set_wallpaper(&file);
    return Ok(file);
}
