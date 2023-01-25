export default function Tweet(props){
    let moment = require('moment');
    let date = moment(props.date_posted);
    let date_and_time_posted = date.format("MMM DD YYYY, h:mm:ss a");

    return(
        <div className="border-2 rounded-lg pt-5 pl-5 lg:w-5/12 xl:w-5/12 bg-white border-sky-200 hover:bg-sky-50 flex flex-col justify-between gap-5"> 
            <div className='mr-5'>
                {props.content}
            </div>
            
            <div className='text-right font-thin mr-3 mb-2'>Tweet Posted On: {date_and_time_posted} </div>
        </div>
    );
}