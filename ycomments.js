(function ($) {
    var settings = {},
        defaults = {
            api: "http://api.ihackernews.com/post/%s?format=jsonp",
            apidatatype: "jsonp",
        };

    $.fn.ycomments = function (options) {
        $.extend(settings, defaults, options);

        return this.each(init);
    };

    init = function () {
        var $this = $(this),
            url = settings.api.replace("%s", settings.id);

        var jump = $("<a href='#ycomments-thread' id='ycomments-jump'>" +
            "Show comments on Hacker News</a>");
        $this.append(jump);

        $.ajax({url: url, dataType: settings.apidatatype})
            .success(function (data) { showcomments(data, jump, $this); } );
    };

    showcomments = function (data, jump, article) {
        jump.text(jump.text().replace("Show", data.commentCount));
    };
})(jQuery);

