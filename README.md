# HackUMass10 - VibeCheckr

## 1] Description
Our service shall run sentiment analysis on the user's current web page and blur out any negative phrases
that meet a certain threshold (selected by the user). The phrases are blurred out only for the user 
similar to the inspect element feature on google chrome.

We have divided our service into two components - a chrome extension (in JavaScript) and a server (in Python).
Our chrome extension will essentially pass in the contents of the currrent webpage to our server.
Our sever shall then classify this data as positive or negative along with a score relating to the extent of the positivity/negativity.
We return this information back to our chrome extension which will then blur out areas whose negativity score meets the user's threshold.

## 2] The server side
Our python server utilizes the sentimental analysis on Hugging Face to get information on the positivity/negativeity of different phrases.
After accepting the paragraphs and block quotes from the chrome extension we run the analysis on this data and return the outcome 
back to the chrome extension as an array of objects (JSON). Each object signifies the positivity/negativity of our base unit - paragraphs and block quotes.
To ensure that our program runs efficiently we asynchronously call the sentimental analysis on each base unit.

## 3] The Chrome extension side
Our chrome extesion shall send all the paragraphs and block quotes to our server (through a post request utilizing the fetch module of node)
and get back their positivity/negativity. Using this information in conjunction with the negativity threshold the extension 
shall blur out the paragraphs and block quotes meeting the required conditions.

The threshold is defined with the help of a slider. Our slider has 5 levels with a lower value(1) translating to blurring only the most negative paragraphs and block quotes and a higher value(5) translating to blurring even areas that have a low negativity score.

## 4] Inspiration



## 5] Challenges we faced

One of the challenges we faced was how to communicate between our chrome extension and the server. We expected to be doing 
some fetch get or post request in our extension to our server. We knew how to use a get request to get data from a server with specific parameters.
However, since we essentially pass in the entire web page, we did not want to use url parameters since the url would get unnecessarily large.
Thus we had to switch to a post request instead which made us take a look at the parameters of a fetch such as headers and body.


Another significant challenge was ensuring that we were saving the blurred version of the webpage so that getting back to that page
(through switching tabs) does not rerun our service. Also we wanted to ensure that our service runs on any other tabs accessed while the extension is turned off.
We had to use the chrome storage api.

Another challenge was the front end of our chrome extension. Only one person in our group had any experience with front end which was minimal.
In the end, however, we were able to figure out how to beautify our extension and make it more user-friendly. 

## 6] Accomplishments we are proud of

## 7] What we've learned
One thing we realized was how tough sentimental analysis is. 
Our testing revealed that certain words have unnecessarily low scores such as cotton and some words were classified as negative
which is not very intuitive such as the shape triangle. 


## 8] What's next

## 9] Built with
While our server was in python, the chrome extension was majorly in Javascript (node.js). We also utilized 
html and css for the pop-up of our extension.

## 10] Prizes we're going for
