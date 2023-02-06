use std::process::Command;

pub fn set(file: &str) {
    let _ = Command::new("gsettings")
        .arg("set")
        .arg("org.cinnamon.desktop.background")
        .arg("picture-uri")
        .arg(format!("file://{}", file))
        .output()
        .unwrap();
}
