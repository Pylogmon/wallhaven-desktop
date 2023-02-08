use std::process::Command;

pub fn set(file: &str) -> Result<(), String> {
    match Command::new("gsettings")
        .arg("set")
        .arg("org.cinnamon.desktop.background")
        .arg("picture-uri")
        .arg(format!("file://{}", file))
        .output()
    {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("壁纸设置失败 {}", e.to_string())),
    }
}
