import React from 'react'
import { Box, TextField, Tooltip, Button, InputAdornment, Divider } from '@mui/material'
import SettingList from '../components/Setting/SettingList'
import SettingItem from '../components/Setting/SettingItem'
export default function Settings() {
    return (
        <Box sx={{
            width: '100%',
            padding: '0 30px',
            height: 'calc(100vh - 60px)',
            overflow: 'auto'
        }}>
            <SettingList>
                <SettingItem label="ApiKey">
                    <Tooltip title="注册wallhaven.cc以获取apikey">
                        <TextField
                            size="small"
                            sx={{ width: 250 }}
                        />
                    </Tooltip>
                </SettingItem>
                <Divider />
                <SettingItem label="外部脚本">
                    <Tooltip title="正常使用无需设置，当无法正常设置壁纸时，可以使用自己的脚本来设置壁纸">
                        <TextField
                            size="small"
                            sx={{ width: 250 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Button size="small">浏览</Button>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Tooltip>
                </SettingItem>
            </SettingList>
        </Box>
    )
}
