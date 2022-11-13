# HackUMass10

## 1] Description
Our service shall run sentiment analysis on the current web page that the user is in and blur out any negative phrases
that meet a certain threshold that is selected by the user. The phrases are blurred out only for the user 
similar to the inspect element feature on google chrome.

We have divided out service into two components - a chrome extension (in JavaScript) and a server (in Python).
The chrome extension will be sending any paragraphs and block quotes from the current webpage to our server.
Our server will return a 
