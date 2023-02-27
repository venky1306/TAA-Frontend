import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function FollowersChart({user_name}){
    console.log(user_name);
    let sen ={
        "user_name": user_name
    }

    let dat;

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://twitaa-backend.azurewebsites.net/followers_count', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
    if (xhr.status === 200) {
        // Handle the response data
        dat = (xhr.responseText);

    }
    else if (xhr.readyState === 4 && xhr.status !== 200) {
        // Handle any errors
        alert('Error: ' + xhr.status);
    }
    };
    xhr.send(JSON.stringify(sen));
    // tweets = tweets.data;
    dat = JSON.parse(dat);
    var len = dat.length;
    var data =[];
    // console.log(typeof(dat[0]));
    // console.log(dat[len-14]);
    var iter = len-14;
    while(iter < len){
        data.push({data:dat[iter].data,followers_gained:dat[iter].followers_count- dat[iter-1].followers_count});
        iter++;
    }
    // console.log(data);


    // let data = 

    return(
        <div className='bg-white rounded-lg pt-3 px-5'>
            <div className='text-2xl text-center mb-3'>Last 14 Days Followers Trend</div>
            
            <ResponsiveContainer width='100%' height={300}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="followers_gained" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
        
    );
}