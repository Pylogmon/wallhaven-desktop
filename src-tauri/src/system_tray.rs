use tauri::{AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayMenu};

pub const UPDATE: &str = "update";
pub const OPEN: &str = "open";
pub const AUTO: &str = "auto";
pub const QUIT: &str = "quit";

pub fn build_system_tray() -> SystemTray {
    let update = CustomMenuItem::new(UPDATE.to_string(), "更换壁纸");
    let open = CustomMenuItem::new(OPEN.to_string(), "打开主界面");
    let auto = CustomMenuItem::new(AUTO.to_string(), "开启自动更换壁纸");
    let quit = CustomMenuItem::new(QUIT.to_string(), "退出");
    let tray_menu = SystemTrayMenu::new()
        .add_item(update)
        .add_item(open)
        .add_item(auto)
        .add_item(quit);
    SystemTray::new().with_menu(tray_menu)
}

pub fn on_update_click() {
    //TODO
}

pub fn on_open_click(app: &AppHandle) {
    match app.get_window("main") {
        Some(window) => {
            window.set_focus().unwrap();
        }
        None => {
            let _main_window =
                tauri::WindowBuilder::new(app, "main", tauri::WindowUrl::App("index.html".into()))
                    .inner_size(800.0, 600.0)
                    .min_inner_size(800.0, 600.0)
                    .title("Wallhaven-desktop")
                    .build()
                    .unwrap();
        }
    }
}
pub fn on_auto_click(app: &AppHandle) {
    let item_handel = app.tray_handle().get_item(AUTO);
    item_handel.set_title("关闭自动更新").unwrap();
    //TODO
}
pub fn on_quit_click() {
    std::process::exit(0);
}
