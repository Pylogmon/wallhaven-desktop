use dbus::blocking::Connection;
use std::time::Duration;

pub fn set(file: &str) -> Result<(), String> {
    let session = match Connection::new_session() {
        Ok(v) => v,
        Err(e) => return Err(format!("new_session {}", e.to_string())),
    };
    let settings = session.with_proxy(
        "com.cutefish.Settings",
        "/Theme",
        Duration::from_millis(5000),
    );
    match settings.method_call("com.cutefish.Theme", "setWallpaper", (file,)) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("壁纸设置失败 {}", e.to_string())),
    }
}
