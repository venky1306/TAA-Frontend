import { useLocation } from 'react-router-dom'
import Tweet from './Tweet';
import SentiResults from './SentiResults';
import FollowersChart from './FollowersChart';
import React from 'react';

var tweets = {};
var recent_tweets;
var data_from_senti;




export default function User(props){
    const [showPie, setShowPie] = React.useState(0);
    const location = useLocation()
    const { from } = location.state
    var user_id = {
        "user_id": from,
    }
    // console.log(user_id)
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://twitaa-backend.azurewebsites.net/user_info', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
    if (xhr.status === 200) {
        // Handle the response data
        tweets = (xhr.responseText);

    }
    else if (xhr.readyState === 4 && xhr.status !== 200) {
        // Handle any errors
        alert('Error: ' + xhr.status);
    }
    };

    xhr.send(JSON.stringify(user_id));
    
    // tweets = tweets.data;
    tweets = JSON.parse(tweets);
    // console.log(tweets.includes.users[0].id)

    // return(<div>{from}</div>)
    var profile_img = tweets.includes.users[0].profile_image_url;
    profile_img = profile_img.substr(0, profile_img.length-11);
    profile_img = profile_img+".jpg";

    // console.log((tweets.data))
    recent_tweets = tweets.data;
    const activatePie = (event, param) => {
        // console.log(typeof(param));
        let sending_data = {
            "text":param,
        }
        var xhr1 = new XMLHttpRequest();

        xhr1.open('POST', 'https://twitaa-backend.azurewebsites.net/sentiment', false);
        xhr1.setRequestHeader('Content-Type', 'application/json');
        xhr1.onreadystatechange = function() {
        if (xhr1.status === 200) {
            // Handle the response data
            data_from_senti = (xhr1.responseText);

        }
        else if (xhr1.readyState === 4 && xhr1.status !== 200) {
            // Handle any errors
            alert('Error: ' + xhr1.status);
        }
        };

        xhr1.send(JSON.stringify(sending_data));
        // data_from_senti = JSON.parse(data_from_senti)
        data_from_senti = new Map(Object.entries(JSON.parse(data_from_senti)));
        console.log((data_from_senti.get('neg')));
        setShowPie(showPie+1);

    };
    
    return(
        <div className="bg-gray-200 h-full">
        <div className="mx-auto max-w-2xl py-8 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 mt-3 gap-y-10 gap-x-6 ">

                {/* Profile Overview Section */}

                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-white xl:aspect-w-7 xl:aspect-h-8">
                    <div className="flex ">
                        <div className='w-4/12'>
                            <div className="flex justify-center">
                                <img
                                        src={profile_img}
                                        alt={tweets.includes.users[0].user}
                                        className="h-8/12 w-8/12 rounded-full mt-5 bg-center"
                                    />
                            </div>
                           
                            <div className='text-center text-xl'>{tweets.includes.users[0].name}</div>
                            <div className='text-center font-thin'>@{tweets.includes.users[0].username}</div>
                        </div>
                            
                        <div className='w-3/12 flex flex-col justify-center gap-4 pr-2'>

                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-sky-50 xl:aspect-w-7 xl:aspect-h-8 hover:opacity-75">
                                <div className="flex">
                                    <img
                                        src='https://drive.google.com/uc?export=view&id=15Z8FMSp9PhhX8oIs78GBRieLFD8t0OWQ'
                                        alt="following logo"
                                        className="h-2/12 w-2/12 rounded-full ml-3 mt-3 mb-3"
                                    />
                                    <div className="my-auto ml-6 text-lg">
                                        <div>{Math.round(tweets.includes.users[0].public_metrics.followers_count/1000000)}M Followers</div>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-sky-50 xl:aspect-w-7 xl:aspect-h-8 hover:opacity-75">
                                <div className="flex">
                                    <img
                                        src="https://cdn4.iconfinder.com/data/icons/various-icons-2/476/Twitter.png"
                                        alt='twitter logo'
                                        className="h-2/12 w-2/12 rounded-full ml-3 mt-3 mb-3"
                                    />
                                    <div className="my-auto ml-6 text-lg">
                                        <div>{tweets.includes.users[0].public_metrics.tweet_count} Tweets</div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-sky-50 xl:aspect-w-7 xl:aspect-h-8 hover:opacity-75">
                                <div className="flex">
                                    <img
                                        src='https://drive.google.com/uc?export=view&id=15Z8FMSp9PhhX8oIs78GBRieLFD8t0OWQ'
                                        alt="following logo"
                                        className="h-2/12 w-2/12 rounded-full ml-3 mt-3 mb-3"
                                    />
                                    <div className="my-auto ml-6 text-lg">
                                        <div>Following {tweets.includes.users[0].public_metrics.following_count}</div>
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                        <div className="w-5/12">

                            <table className="border-collapse table-auto">
                                <tbody className='dark:bg-slate-800'>
                                    <tr className="text-gray-800">
                                        <td className="border-b border-slate-300 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Description</td>
                                        <td className="border-b border-slate-300 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{tweets.includes.users[0].description}</td>
                                    </tr>
                                    <tr className="text-gray-800">
                                        <td className="border-b border-slate-300 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Location</td>
                                        <td className="border-b border-slate-300 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{tweets.includes.users[0].location}</td>
                                    </tr>
                                    <tr className="text-gray-800">
                                        <td className="border-b border-slate-300 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Joined Twitter On</td>
                                        <td className="border-b border-slate-300 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{tweets.includes.users[0].created_at}</td>
                                    </tr>
                                    <tr className="text-gray-800">
                                        <td className="border-b border-slate-300 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Personal Website</td>
                                        <td className="border-b border-slate-300 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{(tweets.includes.users[0].url)?tweets.includes.users[0].url:"N/A"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        
                    </div>
                </div>
                {/* Followers Chart Section */}
                <FollowersChart user_name={tweets.includes.users[0].username} />

                {/* Recent Tweets Section  */}
                
                <div className='bg-white rounded-lg'>
                    <div className='mt-6 text-center text-3xl font-semibold'>Recent Tweets</div>
                    <div className="flex flex-wrap justify-center gap-10  rounded-lg py-7">
                    {recent_tweets.map((single_tweet) => (
                        <Tweet content={single_tweet.text} date_posted={single_tweet.created_at} />
                    ))}
                    
                    </div>
                </div>

                {/* Sentiment Analysis Section */}

                <div className='bg-white rounded-lg flex p-4'>
                    <div className='w-1/2 border-r-2 border-sky-100 '>

                        <div className='text-3xl my-2 text-center'>
                            Sentiment Analysis
                        </div>

                        <div className='grid grid-cols-2 gap-5 my-7 m-auto w-4/12'>
                            <button className='rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold text-white hover:bg-indigo-500' onClick={event => activatePie(event, recent_tweets[0].text)}>Tweet 1</button>
                            <button className='rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold text-white hover:bg-indigo-500' onClick={event => activatePie(event, recent_tweets[1].text)}>Tweet 2</button>
                            <button className='rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold text-white hover:bg-indigo-500' onClick={event => activatePie(event, recent_tweets[2].text)}>Tweet 3</button>
                            <button className='rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold text-white hover:bg-indigo-500' onClick={event => activatePie(event, recent_tweets[3].text)}>Tweet 4</button>
                            <button className='rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold text-white hover:bg-indigo-500' onClick={event => activatePie(event, recent_tweets[4].text)}>Tweet 5</button>
                            <button className='rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold text-white hover:bg-indigo-500' onClick={event => activatePie(event, recent_tweets[5].text)}>Tweet 6</button> 
                        </div>
                    
                    </div>

                    <div className='w-1/2 flex flex-col'>
                        <div className='flex'>
                            <div className='text-3xl ml-3 w-4/6'>Results</div>
                            <div className='flex mt-2 w-2/6 justify-between'>
                                <div className='h-6 rounded bg-[#006eff]'>
                                    Positive
                                </div>
                                <div className='h-6 rounded bg-[#b4bfcf]'>
                                    Neutral
                                </div>
                                <div className='h-6 rounded bg-[#ff0000]'>
                                    Negative
                                </div>    
                            </div>
                            
                        </div>
                        <div className='mx-auto'>
                            {(showPie>0)?<SentiResults positive={data_from_senti.get('pos')*100} negative={data_from_senti.get('neg')*100} neutral={data_from_senti.get('neu')*100} />:'JH'}
                        </div>
                        
                    </div>
                </div>

                

            </div>
        </div>
        </div>
    );
}


