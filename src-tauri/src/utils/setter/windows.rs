use windows::{
    core::HSTRING,
    Win32::{
        System::Com::{CoCreateInstance, CoInitialize, CLSCTX_ALL},
        UI::Shell::{DesktopWallpaper, IDesktopWallpaper},
    },
};

pub fn set(file: &str) {
    // IDesktopWallpaper 使用方法：
    // https://stackoverflow.com/questions/74171921/not-sure-how-to-use-idesktopwallpaper
    // Initialize COM
    unsafe { CoInitialize(None) }.unwrap();
    // Create a DesktkopWallpaper object and return its IDesktopWallpaper interface
    let wallpaper: IDesktopWallpaper =
        unsafe { CoCreateInstance(&DesktopWallpaper, None, CLSCTX_ALL) }.unwrap();

    unsafe {
        match wallpaper.SetWallpaper(None, &HSTRING::from(file)) {
            Ok(_) => {
                println!("The wallpaper setting is successful!")
            }
            Err(e) => {
                println!("{}", e)
            }
        }
    }
}
