use std::process::Command;

pub fn set(file: &str) {
    let output = match Command::new("xfconf-query")
        .arg("-c")
        .arg("xfce4-desktop")
        .arg("-p")
        .arg("/backdrop")
        .arg("-l")
        .output()
    {
        Ok(v) => v,
        Err(e) => return Err(e.string()),
    };
    let output = match String::from_utf8(output.stdout) {
        Ok(v) => v,
        Err(e) => return Err(e.to_string()),
    };
    let output = output.split("\n");
    for i in output {
        if i.contains("last-image") {
            match Command::new("xfconf-query")
                .arg("-c")
                .arg("xfce4-desktop")
                .arg("-p")
                .arg(i)
                .arg("-s")
                .arg(file)
                .output()
            {
                Ok(_) => {}
                Err(e) => Err(format!("壁纸设置失败 {}", e.to_string())),
            }
        }
    }
    Ok(())
}
