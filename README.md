This extension is intended to ease the process of closing large numbers of tabs. I wrote this extension because, for instance after finishing a project, I often found myself with large numbers of tabs that I no longer needed in the window, sometimes mixed in with tabs that I still needed.

At its current stage, the extension works as follows:

You may type into the input which tabs (based on their relative position in the window) you could like to close. For multiple values, you may use commas to separate individual values and hyphens to specify a range.

The extension is written entirely in HTML and vanilla JS. It uses Promises and async/await to implement the Chrome Tabs API, and regular expressions to parse user input.

Example:

1 // closes the first tab

2, 4-6, 8 // closes the second, fourth, fifth, sixth, and eighth tab.

The future features I'd like to add to this extension are:

- ability to use negative numbers to remove tabs based on their position from the right-hand edge

- ability to specify a page title/regex based on the page title, and close all tabs matching the input, rather than use tab position

- ability to specify a domain name from which to close all tabs (e.g. close all tabs beginning with "https://en.wikipedia.org/"