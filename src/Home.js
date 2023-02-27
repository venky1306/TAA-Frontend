import { Link } from 'react-router-dom';
var users_data = {};
function Get_data(){
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://twitaa-backend.azurewebsites.net/users', false);

    xhr.onload = function () {
        if (xhr.status === 200) {
            users_data = JSON.parse(xhr.responseText);
            // console.log(typeof(JSON.parse(xhr.responseText)));
        }
    };

    xhr.send();

}

Get_data();
users_data = users_data.data;
// console.log(users_data[0].name);

  
export default function Home() {
return (
    <div className="bg-white">
    <div className="mx-auto max-w-2xl py-8 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="text-2xl">Popular Twitter Accounts</div>
        <div className="grid grid-cols-1 mt-3 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {users_data.map((user) => (
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 hover:opacity-75">
                    <div className="flex">
                        <img
                            src={user.profile_image_url}
                            alt={user.user}
                            className="h-3/12 w-3/12 rounded-full ml-2 mt-2"
                        />
                        <div className="mx-6 my-4">
                            <Link to={user.username} state={{ from: user.id }}>
                                <div>{user.name}</div>
                            </Link>
                            <div className="font-thin ">@{user.username}</div>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <div>Followers: {Math.round(user.public_metrics.followers_count/100000)/10}M+</div>
                        {/* <div>Tweets: {user.public_metrics.tweet_count}</div> */}
                    </div>
                </div>
        ))}
        </div>
    </div>
    </div>
)
}
  