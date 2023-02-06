use dbus::blocking::Connection;
use std::process::Command;
use std::time::Duration;

pub fn set(file: &str) {
    let output = Command::new("xrandr").output().unwrap();
    let output = String::from_utf8(output.stdout).unwrap();
    let output = output.split("\n");
    let mut screens: Vec<String> = Vec::new();
    for s in output {
        if s.contains(" connected") {
            let screen: Vec<&str> = s.split(" ").collect();
            screens.push(screen[0].to_string())
        }
    }
    let session = Connection::new_session().unwrap();
    let apperance = session.with_proxy(
        "com.deepin.daemon.Appearance",
        "/com/deepin/daemon/Appearance",
        Duration::from_millis(5000),
    );
    for s in screens {
        let _: () = apperance
            .method_call(
                "com.deepin.daemon.Appearance",
                "SetMonitorBackground",
                (s, file),
            )
            .unwrap();
    }
}
