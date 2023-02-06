use std::process::Command;

pub fn set(file: &str) {
    let _ = Command::new("gsettings")
        .arg("set")
        .arg("org.mate.background")
        .arg("picture-filename")
        .arg(file)
        .output()
        .unwrap();
}
