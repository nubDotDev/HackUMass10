# HackUMass10 - VibeCheckr

## 1] Description
Our service shall run sentiment analysis on the current web page that the user is in and blur out any negative phrases
that meet a certain threshold that is selected by the user. The phrases are blurred out only for the user 
similar to the inspect element feature on google chrome.

We have divided out service into two components - a chrome extension (in JavaScript) and a server (in Python).
Our chrome extension will essentially pass in the contents of the currrent webpage to our server.
Our sever shall then classify this data as positive or negative along with a score relating to the extent of the positivity/negativity.
We return this information back to our chrome extension which will then blur out areas whose negativity score meets the user's threshold

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

## 4] Challenges we faced

## 5] Accomplishments we are proud of

## 6] What we've learned

## 7] What's next

## 8] Built with

## 9] Prizes we're going for
