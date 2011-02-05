(function ($) {
    var settings = {},
        defaults = {
            api: "http://api.ihackernews.com/post/%s?format=jsonp",
        };

    $.fn.ycomments = function (options) {
        $.extend(settings, defaults, options);

        return this.each(init);
    };

    init = function () {
        var $this = $(this),
            url = settings.api.replace("%s", settings.id);

        $.ajax({url: url, dataType: "jsonp"})
            .success(showcomments);
    };

    showcomments = function (data) {
    };
})(jQuery);

