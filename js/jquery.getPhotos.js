// GetPhotos jQuery Plugin
// MODULE_DESCRIPTION

(function($) {
    var GetPhotos = function(element, options) {
        this.getPhotos = $(element);

        // Default module configuration
        this.defaults = {
            isAllUsers: true,
            isAllHashtag: true,
            hashtag: 'tennis',
            apiUrl: '',
            username: 'geniebouchard',
            nbPages: 2,
            labels: {
            },
            classes: {
                visuallyhidden: 'visuallyhidden',
                states: {
                    active: 'is-active',
                    inactive: 'is-inactive'
                }
            }
        };

        // Plugin variables
        this.photosQtyByPages = 20;
        this.pageNo = 1;
        this.photoNo = 1;

        this.ajaxLoader = $('.ajax-loader');

        // Merge default classes with window.project.classes
        this.classes = $.extend(true, this.defaults.classes, (window.project ? window.project.classes : {}));

        // Merge default labels with window.project.labels
        this.labels = $.extend(true, this.defaults.labels, (window.project ? window.project.labels : {}));

        // Merge default config with custom config
        this.config = $.extend(true, this.defaults, options || {});

        this.publicMethods = {
            methodName: $.proxy(function() {

            }, this)
        };

        this.init();
    };

    $.extend(GetPhotos.prototype, {

        // Component initialization
        init: function() {
            this.getPhotosFromApi();
        },

        // Get photos from instagram API
        getPhotosFromApi: function(maxID = '') {
            var urlParameter = '?';
            // Page no
            if (maxID != '') {
                urlParameter += 'max_id=' + maxID;
            }
            this.ajaxLoader.addClass(this.classes.states.active);
            // Call to API
            $.ajax({
                url: this.config.apiUrl + this.config.username + '/media' + urlParameter,
                dataType: 'json',
                type: 'GET',
                success: $.proxy(function(data) {
                    this.ajaxLoader.removeClass(this.classes.states.active);
                    this.displayPhotos(data);
                }, this),
                error: function(data) {
                    console.log(data);
                }
            });
        },

        // Display photos from json array
        displayPhotos: function(data) {
            _.each(data.items, $.proxy(function(post) {
                // HTML to append TODO: Build the appropriate HTML
                var validHastag = false;
                var validUser = false;
                var caption = '';
                var stringToAppend = '';


                if (post.caption) {
                    caption = post.caption.text;
                }

                // Image string to append
                stringToAppend = '<img src="' + post.images.standard_resolution.url + '" alt="' + caption + '">';

                // If specific hashtag or all
                if (this.config.isAllHashtag == true) {
                    validHastag = true;
                } else {
                    if (caption.indexOf(this.config.hashtag) !== -1) {
                        validHastag = true;
                    }
                }

                // If specific user or all
                if (this.config.isAllUsers == true) {
                    validUser = true;
                } else {
                    if (post.user.username == this.config.username) {
                        validUser = true;
                    }
                }

                // Append image
                if (validHastag == true && validUser == true) {
                    this.getPhotos.append(stringToAppend);
                }

                // If last photo of current page & not last page
                if (this.photoNo == (this.photosQtyByPages * this.pageNo) && this.pageNo < this.config.nbPages) {
                    this.getPhotosFromApi(post.id);
                    this.pageNo++;
                }

                this.photoNo++;
            }, this));
        }

    });

    $.fn.getPhotos = function(options) {
        this.each($.proxy(function(index, element) {
            var $element = $(element);

            // Return early if this $element already has a plugin instance
            if ($element.data('getPhotos')) return;

            // Pass options to plugin constructor
            var getPhotos = new GetPhotos(element, options);

            // Add every public methods to plugin
            for (var key in getPhotos.publicMethods) {
                this[key] = getPhotos.publicMethods[key];
            }

            // Store plugin object in this $element's data
            $element.data('getPhotos', getPhotos);
        }, this));

        return this;
    };
})(jQuery);
