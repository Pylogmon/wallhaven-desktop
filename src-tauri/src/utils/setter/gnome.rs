use std::process::Command;

pub fn set(file: &str) -> Result<(), String> {
    match Command::new("gsettings")
        .arg("set")
        .arg("org.gnome.desktop.background")
        .arg("picture-uri")
        .arg(file)
        .output()
    {
        Ok(_) => {}
        Err(e) => return Err(e.to_string()),
    }
    match Command::new("gsettings")
        .arg("set")
        .arg("org.gnome.desktop.background")
        .arg("picture-uri-dark")
        .arg(file)
        .output()
    {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}
