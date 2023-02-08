use dbus::blocking::Connection;
use std::time::Duration;

pub fn set(file: &str) -> Result<(), String> {
    let scripts = format!(
        r#"
        var allDesktops = desktops();
        print (allDesktops);
        for (i=0;i<allDesktops.length;i++) {{
            d = allDesktops[i];
            d.wallpaperPlugin = "org.kde.image";
            d.currentConfigGroup = Array("Wallpaper", "org.kde.image", "General");
            d.writeConfig("Image", "file://{file}")
        }}
        "#
    );
    let session = match Connection::new_session() {
        Ok(v) => v,
        Err(e) => return Err(format!("new_session {}", e.to_string())),
    };
    let shell = session.with_proxy(
        "org.kde.plasmashell",
        "/PlasmaShell",
        Duration::from_millis(5000),
    );
    match shell.method_call("org.kde.PlasmaShell", "evaluateScript", (&scripts,)) {
        Ok(_) => {}
        Err(e) => Err(format!("壁纸设置失败 {}", e.to_string())),
    }
}
