use dbus::blocking::Connection;
use std::time::Duration;

pub fn set(file: &str) {
    let session = Connection::new_session().unwrap();
    let settings = session.with_proxy(
        "com.cutefish.Settings",
        "/Theme",
        Duration::from_millis(5000),
    );
    let _: () = settings
        .method_call("com.cutefish.Theme", "setWallpaper", (file,))
        .unwrap();
}
