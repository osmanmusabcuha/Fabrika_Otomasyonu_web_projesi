import { ConfigProvider as AntdProvider, App as AntdApp } from "antd"

const ConfigProvider = ({children}) => {
  return (
    <AntdProvider>
        <AntdApp>{children}</AntdApp>
    </AntdProvider>

  )
}

export default ConfigProvider
