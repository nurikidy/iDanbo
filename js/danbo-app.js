
        feed = new Instafeed({
            clientId: '203213b8a766404da65b00220569f932',
            get: 'tagged',
            tagName: 'danbo',
            sortBy: 'random',
            resolution: 'standard_resolution',
            links: 'false',
            limit: '10',
            template: '<img src="{{image}}" /><div class="caption">by {{model.user.username}}<br />{{caption}} likes in Instagram</div>',
            mock: true,
            custom: {
                images: [],
                currentImage: 0,
                showImage: function () {
                    var result, image;
                    image = this.options.custom.images[this.options.custom.currentImage];
                    result = this._makeTemplate(this.options.template, {
                        model: image,
                        id: image.id,
                        link: image.link,
                        image: image.images[this.options.resolution].url,
                        caption: this._getObjectProperty(image, 'caption.text'),
                        likes: image.likes.count,
                        comments: image.comments.count,
                        location: this._getObjectProperty(image, 'location.name')
                    });
                    $("#instafeed").html(result);
                }
            },
            success: function (data) {
                this.options.custom.images = data.data; 
                this.options.custom.showImage.call(this);
            }
        });

        feed.run();

        $(".next").click(function () {
            var length, current;
            current = feed.options.custom.currentImage;
            length = feed.options.custom.images.length;
            if (current < length - 1) {
                feed.options.custom.currentImage++;
                feed.options.custom.showImage.call(feed);
            }
        });

        $(".prev").click(function () {
            var length, current;
            current = feed.options.custom.currentImage;
            length = feed.options.custom.images.length;
            if (current > 0) {
                feed.options.custom.currentImage--;
                feed.options.custom.showImage.call(feed);
            }
        });

        $("#instafeed").on("swipeleft", function() {
            var length, current;
            current = feed.options.custom.currentImage;
            length = feed.options.custom.images.length;
            if (current < length - 1) {
                feed.options.custom.currentImage++;
                feed.options.custom.showImage.call(feed);
            }            
        });

        $("#instafeed").on("swiperight", function() {
            var length, current;
            current = feed.options.custom.currentImage;
            length = feed.options.custom.images.length;
            if (current > 0) {
                feed.options.custom.currentImage--;
                feed.options.custom.showImage.call(feed);
            }
        });

        $(".reload").click(function () {                        
            location.reload('#danbo-main');
        });