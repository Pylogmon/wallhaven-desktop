use dbus::blocking::Connection;
use std::time::Duration;

pub fn set(file: &str) {
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
    let session = Connection::new_session().unwrap();
    let shell = session.with_proxy(
        "org.kde.plasmashell",
        "/PlasmaShell",
        Duration::from_millis(5000),
    );
    return shell
        .method_call("org.kde.PlasmaShell", "evaluateScript", (&scripts,))
        .unwrap();
}
