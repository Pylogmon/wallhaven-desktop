use windows::{
    core::HSTRING,
    Win32::{
        System::Com::{CoCreateInstance, CoInitialize, CLSCTX_ALL},
        UI::Shell::{DesktopWallpaper, IDesktopWallpaper},
    },
};

pub fn set(file: &str) -> Result<(), String> {
    // IDesktopWallpaper 使用方法：
    // https://stackoverflow.com/questions/74171921/not-sure-how-to-use-idesktopwallpaper
    // Initialize COM
    match unsafe { CoInitialize(None) } {
        Ok(_) => {}
        Err(e) => return Err(e.to_string()),
    };
    // Create a DesktkopWallpaper object and return its IDesktopWallpaper interface
    let wallpaper: IDesktopWallpaper =
        match unsafe { CoCreateInstance(&DesktopWallpaper, None, CLSCTX_ALL) } {
            Ok(v) => v,
            Err(e) => return Err(e.to_string()),
        };

    unsafe {
        match wallpaper.SetWallpaper(None, &HSTRING::from(file)) {
            Ok(_) => Ok(()),
            Err(e) => Err(format!("壁纸设置失败 {}", e.to_string())),
        }
    }
}
