use super::setter::*;
#[cfg(target_os = "linux")]
use super::sys::DE;
use super::sys::{get_de, get_os, OS};

#[tauri::command]
pub fn set_wallpaper(file: &str) {
    let os = match get_os() {
        Some(os) => os,
        None => {
            println!("不支持的操作系统");
            return;
        }
    };
    match os {
        OS::Windows =>
        {
            #[cfg(target_os = "windows")]
            windows::set(file)
        }
        OS::MacOS =>
        {
            #[cfg(target_os = "macos")]
            macos::set(file)
        }
        OS::Linux => {
            let _de = match get_de() {
                Some(de) => de,
                None => {
                    println!("不支持的桌面环境");
                    return;
                }
            };
            #[cfg(target_os = "linux")]
            match _de {
                DE::Deepin => deepin::set(file),
                DE::KDE => kde::set(file),
                DE::Gnome => gnome::set(file),
                DE::Cinnamon => cinnamon::set(file),
                DE::Cutefish => cutefish::set(file),
                DE::XFCE => xfce::set(file),
                DE::MATE => mate::set(file),
                DE::LXQT => lxqt::set(file),
                DE::LXDE => lxde::set(file),
                DE::Yoyo => yoyo::set(file),
            }
        }
    }
}
