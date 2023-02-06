use std::process::Command;

pub fn set(file: &str) {
    let command_str = format!(
        "\'tell application \"Finder\" to set desktop picture to POSIX file \"{}\"\'",
        file
    );
    let _ = Command::new("osascript")
        .arg("-e")
        .arg(command_str)
        .output()
        .unwrap();
}
