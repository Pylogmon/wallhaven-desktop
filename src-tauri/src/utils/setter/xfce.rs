use std::process::Command;

pub fn set(file: &str) {
    let output = Command::new("xfconf-query")
        .arg("-c")
        .arg("xfce4-desktop")
        .arg("-p")
        .arg("/backdrop")
        .arg("-l")
        .output()
        .unwrap();
    let output = String::from_utf8(output.stdout).unwrap();
    let output = output.split("\n");
    for i in output {
        if i.contains("last-image") {
            let _ = Command::new("xfconf-query")
                .arg("-c")
                .arg("xfce4-desktop")
                .arg("-p")
                .arg(i)
                .arg("-s")
                .arg(file)
                .output()
                .unwrap();
        }
    }
}
