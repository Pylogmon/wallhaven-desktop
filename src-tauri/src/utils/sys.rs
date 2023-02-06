use std::env;

pub enum OS {
    Windows,
    Linux,
}

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
}

pub fn get_os() -> Option<OS> {
    let os = env::consts::OS;
    match os {
        "windows" => Some(OS::Windows),
        "linux" => Some(OS::Linux),
        _ => None,
    }
}

pub fn get_de() -> Option<DE> {
    let de = match env::var("XDG_CURRENT_DESKTOP") {
        Ok(de) => de,
        Err(_) => panic!("error"),
    };
    match de.as_str() {
        "KDE" => Some(DE::KDE),
        "Deepin" => Some(DE::Deepin),
        "Gnome" | "ubuntu:Gnome" => Some(DE::Gnome),
        "X-Cinnamon" => Some(DE::Cinnamon),
        "Cutefish" => Some(DE::Cutefish),
        "XFCE" => Some(DE::XFCE),
        "MATE" => Some(DE::MATE),
        "LXQT" => Some(DE::LXQT),
        "LXDE" => Some(DE::LXDE),
        _ => None,
    }
}
