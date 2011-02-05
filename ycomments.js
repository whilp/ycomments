(function ($) {
    var settings = {},
        defaults = {
            api: "http://api.ihackernews.com/post/%s?format=jsonp&callback=?",
        };

    $.fn.ycomments = function (options) {
        $.extend(settings, defaults, options);

        return this.each(init);
    };

    init = function () {
        var $this = $(this);
    };
})(jQuery);

