# HackUMass10 - VibeCheckr

## 1] Description
Our service shall run sentiment analysis on the current web page that the user is in and blur out any negative phrases
that meet a certain threshold that is selected by the user. The phrases are blurred out only for the user 
similar to the inspect element feature on google chrome.

We have divided out service into two components - a chrome extension (in JavaScript) and a server (in Python).
Our chrome extension will essentially pass in the contents of the currrent webpage to our server.
Our sever shall then classify this data as positive or negative along with a score relating to the extent of the positivity/negativity.
We return this information back to our chrome extension which will then blur out areas whose negativity score meets the user's threshold
