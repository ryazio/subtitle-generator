# subtitle-generator

> an easy way to generate subtitle (srt) files from json object.

## Install

```
$ npm install subtitle-generator
```


## Usage

```js
import { generateSRT } from 'subtitle-generator';

// if the json data is in timestamp format
const subtitleText = generateSRT(jsonData, 'timestamp');

// if the json data is in seconds format
const subtitleText = generateSRT(jsonData, 'seconds');
```

### Start time in seconds format

By default it will start subtitles from `00:00:00:00` time.
If you want another time, send it as third parameter
```js
const subtitleText = generateSRT(jsonData, 'seconds', '00:01:12:013');
```




## JSON format

To generate the srt file, input the JSON data in the following two ways:

### Timestamp format
Simply add the start and end timestamp for each subtitle content in format `hh:mm:ss,ms`

```js
const content = [
   {
      start: "00:00:00,498",
      end: "00:00:02,827",
      content: "Here's what I love most about food and diet."
   },
   {
      start: "00:00:02,827",
      end: "00:00:06,383",
      content: "We all eat several times a day, and we're totally in charge"
   },
   {
      start: "00:00:06,383",
      end: "00:00:09,427",
      content: "of what goes on our plate and what stays off."
   },
]
```
### Seconds format
Save the number of seconds you want the subtitle content to appear. It will calculate the required timestamps based on that automatically.

```js

const content = [
   {
      seconds: 2, 
      content: "Here's what I love most about food and diet."
   },
   {
      seconds: 4.5,
      content: "We all eat several times a day, and we're totally in charge"
   },
   {
      seconds: 3.5,
      content: "of what goes on our plate and what stays off."
   },
]
```

Both JSON data will generate the following srt text

```
1
00:00:00,000 --> 00:00:02,000
Here's what I love most about food and diet.

2
00:00:02,000 --> 00:00:06,500
We all eat several times a day, and we're totally in charge

3
00:00:06,500 --> 00:00:10,000
of what goes on our plate
and what stays off.
```
