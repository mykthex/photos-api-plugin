# jQuery photos API Plugin
Get photos from the instagram API and add them to a DIV

## Usage

1. Include jQuery and dependencies:

	```html
	<script src="path/to/jquery.min.js"></script>
	<script src="path/to/underscore.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="path/to/jquery.getPhotos.js"></script>
	```

3. Prepare the HTML for the photos container and the ajax loader:

	```html
	<div class="photosContainer"></div><div class="ajax-loader"></div>
	```

3. Call the plugin:

	```javascript
	$('.photosContainer').lightbox({
	    apiUrl: '',
	    hashtag: '',
            username: ''
	});
	```

## Downloads

* Ya know what to do.

## Configuration

#### `apiUrl`

> **Type:** String<br>
**Default value:** -

The API URL returning JSON

---

#### `isAllUsers`

> **Type:** Boolean<br>
**Default value:** true

If you want to show post from all users on given feed or for a user only. (set via username parameter)

---

#### `isAllHashtag`

> **Type:** Boolean<br>
**Default value:** true

If you want to show post with all hashtags on given feed or posts with only a hashtag. (set via hashtag parameter)

---

#### `hashtag`

> **Type:** String<br>
**Default value:** -

Parameter used to display post only with specified hashtag

---

#### `username`

> **Type:** String<br>
**Default value:** -

Parameter used to display post only with specified user author

---

#### `nbPages`

> **Type:** Integer<br>
**Default value:** 2

Number of photos (20 photos per page)

---


### Classes

```javascript
classes: {
    visuallyhidden: 'visuallyhidden',
    states: {
        active: 'is-active',
        inactive: 'is-inactive'
    }
}
```
## History

Check [Releases](../../releases) for detailed changelog.

