(function (doc, win) {
        var docEle = doc.documentElement;
        var dpr=Math.min(win.devicePixelRatio, 3);
        var scale = 1 / dpr;
        var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
        var metaEle = doc.createElement('meta');
        metaEle.name = 'viewport';
        metaEle.content = 'initial-scale=' + scale + ',maximum-scale=' + scale;
        docEle.firstElementChild.appendChild(metaEle);
        var recalCulate = function () {
            var width = docEle.clientWidth;
            docEle.style.fontSize = 10 * (width / 320) + 'px';
        };
        recalCulate();
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvent, recalCulate, false);
    })(document, window);