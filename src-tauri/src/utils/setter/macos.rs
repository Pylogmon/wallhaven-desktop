use std::process::Command;

pub fn set(file: &str) -> Result<(), String> {
    let command_str = format!(
        "\'tell application \"Finder\" to set desktop picture to POSIX file \"{}\"\'",
        file
    );
    match Command::new("osascript")
        .arg("-e")
        .arg(command_str)
        .output()
    {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}
