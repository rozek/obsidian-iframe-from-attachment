## iframe-from-attachment ##

This simple [Obsidian](https://obsidian.md/) plugin converts a code block of type `iframe-from-attachment` containing the (relative) path to an HTML file (usually an attachment) within your vault into an iFrame.

The main benefit of using this plugin instead of an `<iframe>` HTML element is the possibility to refer to a local attachment rather than an external URL - independent of the absolute location of your Obsidian vault (and independent of your platform)

### Usage

Usage is straightforward: just create a "fenced code block" of type `iframe-from-attachment` with the path to the HTML file you want to display (relative to the note in the Obsidian vault) and any additional desired arguments as its content, then switch to preview mode — the specified HTML page should then be visible there.

There are three variants:

#### Display without size restrictions

````
```iframe-from-attachment
relative/path/to/document.html
```
````

#### Display with fixed width

````
```iframe-from-attachment
relative/path/to/document.html <width>
```
````

#### Display with fixed width and height

````
```iframe-from-attachment
relative/path/to/document.html <width>x<height>
```
````

## License ##

[MIT License](LICENSE.md)
