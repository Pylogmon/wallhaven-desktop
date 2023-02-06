use dbus::blocking::Connection;
use std::time::Duration;

pub fn set(file: &str) {
    let session = Connection::new_session().unwrap();
    let settings = session.with_proxy("com.yoyo.Settings", "/Theme", Duration::from_millis(5000));
    return settings
        .method_call("com.yoyo.Theme", "setWallpaper", (file,))
        .unwrap();
}
