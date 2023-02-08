use std::process::Command;

pub fn set(file: &str) -> Result<(), String> {
    match Command::new("pcmanfm").arg("-w").arg(file).output() {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("壁纸设置失败 {}", e.to_string())),
    }
}
