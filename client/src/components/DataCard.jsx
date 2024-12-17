import { ProfileOutlined } from '@ant-design/icons'
import { Statistic, theme } from 'antd'

const DataCard = ({icon: Icon, value, title, color}) => {
    const IconComponent = Icon;
    const {
        token: {  boxShadow, geekblue, padding, borderRadiusSM },
      } = theme.useToken();
    
  return (
    <Statistic
          title={title}
          value={value}
        
          valueStyle={{
            color: color || geekblue,
          }}
          style={{
            boxShadow: boxShadow,
            padding: padding,
            borderRadius: borderRadiusSM,
          }}
          
          prefix={IconComponent === undefined ? "" : <IconComponent />}
        />
  )
}

export default DataCard