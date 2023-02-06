use std::process::Command;

pub fn set(file: &str) {
    let _gs1 = Command::new("gsettings")
        .arg("set")
        .arg("org.gnome.desktop.background")
        .arg("picture-uri")
        .arg(file)
        .output()
        .unwrap();
    let _gs2 = Command::new("gsettings")
        .arg("set")
        .arg("org.gnome.desktop.background")
        .arg("picture-uri-dark")
        .arg(file)
        .output()
        .unwrap();
}
