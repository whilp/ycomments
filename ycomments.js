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

        var discuss = $.fn.ycomments.postid(settings.id, "Discuss this on Hacker News") + " | ";
        $this.append(discuss);

        var jump = $("<a href='#ycomments-thread' id='ycomments-jump'>" +
            "Show comments</a>");
        $this.append(jump);

        $.ajax({url: url, dataType: settings.apidatatype})
            .success(function (data) { showcomments(data, jump, $this); } );
    };

    showcomments = function (data, jump, article) {
        jump.text(jump.text().replace("Show", data.commentCount));
        jump.before(data.points + " points | ");

        var comments = "<section id='ycomments-thread'>" + 
            "<header><h1>Showing " + data.commentCount + " comments</h1>" +
            "</header>";

        $.each(data.comments, function () {
            comments += $.fn.ycomments.thread(this, 0);
        });

        comments += '</section>';
        article.append(comments);
    };

    $.fn.ycomments.thread = function (thread) {
        var html = "<article class='ycomments-comment'>" +
            "<header><p>" + 
                $.fn.ycomments.vote(thread.id, settings.id) + " " +
                thread.points + " points " +
                "by " + $.fn.ycomments.user(thread.postedBy) + " " +
                thread.postedAgo + " | " + $.fn.ycomments.postid(thread.id, "link") +
            "</p></header>";

        html += "<p class='ycomments-comment-text";
        if (thread.points < 1)
            html += " ycomments-unpopular";
        html += "'>" + $.fn.ycomments.comment(thread.comment) + "</p>";
        html += "<p>" + $.fn.ycomments.reply(thread.id, settings.id) + "</p>";

        $.each(thread.children, function () {
            html += $.fn.ycomments.thread(this);
        });
        html += "</article>";

        return html;
    };

    $.fn.ycomments.user = function (user) {
        var html = "<a href='http://news.ycombinator.com/user?id=%s'>%s</a>";
        return html.replace(/%s/g, user);
    };

    $.fn.ycomments.postid = function (id, text) {
        return "<a href='http://news.ycombinator.com/item?id=" + id + "'>" + text + "</a>";
    };

    $.fn.ycomments.comment = function (comment) {
        return comment
            .replace(/color=\"#......\"/, "")
            .replace(/<p>/g, "<br />");
    };

    $.fn.ycomments.vote = function (id, parent) {
        return "<a class='ycomments-vote' " +
            "href='http://news.ycombinator.com/vote?for=" + id +
            "&amp;dir=up&amp;whence=item&amp;id=" + (parent ? parent : id) + "'>▲</a>";
    };

    $.fn.ycomments.reply = function (id, parent) {
        return "<a class='ycomments-reply' " +
            "href='http://news.ycombinator.com/reply?id=" + id +
            "&amp;whence=item&amp;id=" + (parent ? parent : id) + "'>reply</a>";
    };
})(jQuery);

