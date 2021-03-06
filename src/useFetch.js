import { useState, useEffect } from 'react';
// pass url endpoint as a parameter
const useFetch = (url) => {

  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // define inside this component so can interact with data directly and then pass function through as a prop in the return
  // const handleLink = () => {
  //   alert("gone to view more page");
  // }


  // runs a function on every render - anytime the data changes
  useEffect(() => {
    const abortCont = new AbortController();
    // setTimeout to show loading message for a second - This is to simulate if we was fetching data from an external api
    setTimeout(() => {
      //get endpoint
      fetch(url, { signal: abortCont.signal })
        .then(res => {
          //console.log(res)
          if (!res.ok) { // if response is not okay, throw new error
            throw Error('could not get the data. Please try again later');
          }
          //returns promise
          return res.json()
        })
        //returns another promise of data from json server as a parameter 
        .then((data) => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch(err => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            // Catches network error automatically
            setIsPending(false);
            setError(err.message);
          }
        })
    }, 1000);
    //stop the fetch in the background as we dont want to update the state - ABORT CONTROLLER
    return () => abortCont.abort();

    //whenever url changes run function // array added to stop re renders continuously
    // if empty when its first render only 
  }, [url])


  return { data, isPending, error };
}

export default useFetch;