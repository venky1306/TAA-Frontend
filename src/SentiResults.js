import { PieChart } from 'react-minimal-pie-chart';

export default function SentiResults(props){
    console.log(props);
    return (
    
        <PieChart
            center={[50, 50]}
            data={[
                {
                color: "#006eff",
                title: "Positive",
                value: props.positive,
                },
                {
                color: "#ff0000",
                title: "Negative",
                value: props.negative,
                },
                {
                color: "#b4bfcf",
                title: "Neutral",
                value: props.neutral,
                },
            ]}
            labelPosition={50}
            lengthAngle={360}
            lineWidth={50}
            paddingAngle={0}
            radius={50}
            
            startAngle={0}
            viewBoxSize={[100, 100]}
            style={{width: '90%', height: '90%'}}
        />

);}