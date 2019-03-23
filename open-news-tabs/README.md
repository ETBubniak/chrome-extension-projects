This extension will allow you to designate a folder with sub-folders.

It will iterate over each subfolder and open one bookmark from each subfolder. If the 
folder has any direct bookmarks, it will pick one at random and open it as well.

Ex:

Folder
- Subfolder 1
-- Bookmark A
-- Bookmark B
-- Bookmark C
- Subfolder 2
-- Bookmark D
-- Bookmark E
-- Bookmark F
- Subfolder 3
-- Bookmark G
-- Bookmark H
-- Bookmark I
- Bookmark J
- Bookmark K

Running this with Folder designated might cause, for instance, Bookmarks A, E, H, and J 
to open.

Why do I do this?

I study foreign languages. In my bookmarks bar, I have a folder containing news sites in various languages, grouped in subfolders by language.
As I find new, interesting sites to read, each subfolder grows. I don't want to neglect them or forget about them, but if I have too many, it's difficult to pick one without settling into reading the same site every time.
This extension solves this problem by picking a random one from each subfolder. It scales up if I add more subfolders, and if I decide to put a site into my news folder without putting it into a subfolder, it is still a candidate to be opened.
So I'm very happy with it.

My current challenge is giving the user an elegant way within the extension to select a folder to traverse. Currently it requires knowing the folder ID due to the way that Chrome's tabs API works.