#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod cmds;
mod system_tray;
mod utils;

use cmds::*;
use system_tray::*;
use tauri::SystemTrayEvent;
use utils::set_wallpaper::set_wallpaper;

fn main() {
    tauri::Builder::default()
        //注册js调用函数
        .invoke_handler(tauri::generate_handler![
            set_wallpaper,
            download_image,
            set_as_wallpaper
        ])
        //加载托盘图标
        .system_tray(build_system_tray())
        //绑定托盘事件
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                UPDATE => on_update_click(),
                OPEN => on_open_click(app),
                AUTO => on_auto_click(app),
                QUIT => on_quit_click(),
                _ => {}
            },
            _ => {}
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            _ => {}
        });
}
