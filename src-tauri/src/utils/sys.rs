use std::env;

pub enum OS {
    Windows,
    Linux,
    MacOS,
}

#[cfg(target_os = "linux")]
pub enum DE {
    Deepin,
    KDE,
    Gnome,
    Cinnamon,
    Cutefish,
    XFCE,
    MATE,
    LXQT,
    LXDE,
    Yoyo,
}

pub fn get_os() -> Option<OS> {
    let os = env::consts::OS;
    match os {
        "windows" => Some(OS::Windows),
        "linux" => Some(OS::Linux),
        "macos" => Some(OS::MacOS),
        _ => None,
    }
}

#[cfg(target_os = "linux")]
pub fn get_de() -> Option<DE> {
    let de = match env::var("XDG_CURRENT_DESKTOP") {
        Ok(de) => de,
        Err(_) => panic!("error"),
    };
    match de.as_str() {
        "KDE" => Some(DE::KDE),
        "Deepin" => Some(DE::Deepin),
        "Gnome" => Some(DE::Gnome),
        "GNOME" => Some(DE::Gnome),
        "ubuntu:Gnome" => Some(DE::Gnome),
        "ubuntu:GNOME" => Some(DE::Gnome),
        "X-Cinnamon" => Some(DE::Cinnamon),
        "Cutefish" => Some(DE::Cutefish),
        "XFCE" => Some(DE::XFCE),
        "MATE" => Some(DE::MATE),
        "LXQT" => Some(DE::LXQT),
        "LXDE" => Some(DE::LXDE),
        "Yoyo" => Some(DE::Yoyo),
        _ => None,
    }
}
