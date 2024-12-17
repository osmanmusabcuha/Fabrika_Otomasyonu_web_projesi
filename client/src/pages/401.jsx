import { Button, Typography, theme } from 'antd';
import React from 'react'
import useScreenSize from '../hooks/useScreenSize';
import { ArrowUpOutlined, ArrowsAltOutlined, RollbackOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const {Title, Text} = Typography;

const Unauthorized = () => {
    const screenSize = useScreenSize();
const mobile = screenSize.width <= 992
const navigate = useNavigate()
  return (
    <div style={{
        display: 'flex',
        justifyContent: "center",
        flex: 1,
        alignItems: 'center'

    }}>
    <div style={{
        display: 'flex',
        flexDirection: 'column',    


    }}>
        <Title style={{
            fontFamily: "helvetica",
            fontSize: "72px",
            fontWeight: "bold",
            textAlign: "center"
            
        }} type='danger' level={1}>401</Title>
        <Text strong style={{
            fontFamily: "helvetice",
            fontSize: "32px",
            textAlign: 'center'
        }}>Yetkiniz olmadığı sayfaya erişmeye çalıştınız lütfen giriş yapınız!</Text>

        <Button style={{
            marginTop: 20,
            width: mobile ? "90%":"25%",
            alignSelf: "center"
        }} 
        icon={<RollbackOutlined />}  type='primary'
        onClick={() => navigate("/")}
         >
            Giriş Yap
            </Button>

        </div>
    </div>
  )
}

export default Unauthorized;