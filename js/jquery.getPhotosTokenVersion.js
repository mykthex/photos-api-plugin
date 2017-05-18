// GetPhotos jQuery Plugin
// MODULE_DESCRIPTION

(function($) {
    var GetPhotos = function(element, options) {
        this.getPhotos = $(element);

        // Default module configuration
        this.defaults = {
            isAllUsers: true,
            clientId: '5eb70d88f54848a3b2fba8eaa7183845',
            accessToken: '104756445.5eb70d8.196751f151204d7eb15353538f78f853',
            photosQty: '20',
            hashtag: 'coffee',
            userID: '104756445',
            labels: {
                label1: 'label1',
                label2: 'label2'
            },
            classes: {
                class1: 'class1',
                class2: 'class2',
                states: {
                    active: 'is-active'
                }
            }
        };

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
        getPhotosFromApi: function() {
            $.ajax({
                url: 'https://api.instagram.com/v1/users/' + this.config.userID + '/media/recent/',
                dataType: 'jsonp',
                type: 'GET',
                data: { access_token: this.config.accessToken },
                success: $.proxy(function(data) {
                    this.displayPhotos(data);
                }, this),
                error: function(data) {
                    console.log(data);
                }
            });
        },

        // Display photos from json array
        displayPhotos: function(data) {
            _.each(data.data, $.proxy(function(post) {
                console.log(post);
                // HTML to append TODO: Build the appropriate HTML
                var stringToAppend = '';
                // If post matches hashtag
                if ($.inArray(this.config.hashtag, post.tags) > -1) {
                    // Displaying all content
                    if (this.config.isAllUsers == true) {
                        stringToAppend = '<img src="' + post.images.standard_resolution.url + '" alt="' + post.caption.text + '">';
                    } else {
                        // Displaying content that matches user specified
                        if (post.user.id == this.config.userID) {
                            stringToAppend = '<img src="' + post.images.standard_resolution.url + '" alt="' + post.caption.text + '">';
                        }
                    }
                    // Append image
                    if(stringToAppend != '') {
                        this.getPhotos.append(stringToAppend);
                    }
                }

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
