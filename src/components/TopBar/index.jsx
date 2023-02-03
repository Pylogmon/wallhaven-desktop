import React from 'react'
import { Box, Button, alpha, Container } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useMatch, useResolvedPath, useNavigate } from "react-router-dom";
function Item(props) {
    const { to, children } = props;
    const { palette: { primary } } = useTheme();
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    const navigate = useNavigate();

    return (
        <Button
            style={{
                width: '100px',
                color: match ? primary.main : primary.contrastText,
                margin: '6px 10px',
                fontSize: '18px',
                fontWeight: '700',
                ":hover": { backgroundColor: alpha(primary.main, 0.35) },
            }}
            onClick={() => navigate(to)}
            children={children}
        />
    )
}
export default function TopBar() {

    return (
        <Box sx={{ height: 60, textAlign: "center" }}>
            <Item to="/wallhaven" >浏览</Item>
            <Item to="/collections" >收藏</Item>
            <Item to="/settings" >设置</Item>
        </Box>
    )
}
