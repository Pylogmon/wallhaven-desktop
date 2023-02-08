use super::setter::*;
#[cfg(target_os = "linux")]
use super::sys::{get_de, DE};
use super::sys::{get_os, OS};

#[tauri::command]
pub fn set_wallpaper(file: &str) -> Result<(), String> {
    let os = match get_os() {
        Some(os) => os,
        None => return Err("不支持的操作系统".to_string()),
    };
    match os {
        #[cfg(target_os = "windows")]
        OS::Windows => windows::set(file),
        #[cfg(target_os = "macos")]
        OS::MacOS => macos::set(file),
        #[cfg(target_os = "linux")]
        OS::Linux => {
            let de = match get_de() {
                Some(de) => de,
                None => Err("不支持的桌面环境"),
            };

            match de {
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
        _ => Ok(()),
    }
}
