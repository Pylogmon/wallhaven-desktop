use dbus::blocking::Connection;
use std::process::Command;
use std::time::Duration;

pub fn set(file: &str) -> Result<(), String> {
    let output = match Command::new("xrandr").output() {
        Ok(v) => v,
        Err(e) => return Err(format!("xrandr执行出错{}", e.to_string())),
    };
    let output = match String::from_utf8(output.stdout) {
        Ok(v) => v,
        Err(e) => return Err(e.to_string()),
    };
    let output = output.split("\n");
    let mut screens: Vec<String> = Vec::new();
    for s in output {
        if s.contains(" connected") {
            let screen: Vec<&str> = s.split(" ").collect();
            screens.push(screen[0].to_string())
        }
    }
    let session = match Connection::new_session() {
        Ok(v) => v,
        Err(e) => return Err(format!("new_session {}", e.to_string())),
    };
    let apperance = session.with_proxy(
        "com.deepin.daemon.Appearance",
        "/com/deepin/daemon/Appearance",
        Duration::from_millis(5000),
    );
    for s in screens {
        match apperance.method_call(
            "com.deepin.daemon.Appearance",
            "SetMonitorBackground",
            (s, file),
        ) {
            Ok(()) => {}
            Err(e) => return Err(format!("壁纸设置失败 {}", e.to_string())),
        }
    }
    Ok(())
}
