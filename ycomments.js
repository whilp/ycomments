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

        var comments = "<section id='ycomments-thread'>" + 
            "<header><h1>Showing " + data.commentCount + " comments</h1>" +
            "<p>Sort comments</p>" + 
            "</header>";

        $.each(data.comments, function () {
            comments += $.fn.ycomments.thread(this, 0);
        });

        comments += '</section>';
        article.append(comments);
    };

    $.fn.ycomments.thread = function (thread, depth) {
        var html = "<article class='ycomments-comment ycomments-comment-depth-" + depth + "'>" +
            "<header>posted by: " + thread.postedBy + "</header>";
        $.each(thread.children, function () {
            html += $.fn.ycomments.thread(this, depth + 1);
        });
        html += "</article>";

        return html;
    };
})(jQuery);

