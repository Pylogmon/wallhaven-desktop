use std::process::Command;

pub fn set(file: &str) {
    let _ = Command::new("pcmanfm-qt")
        .arg("-w")
        .arg(file)
        .output()
        .unwrap();
}
