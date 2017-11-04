function removeOption() {
    var removeObjs = ['#bannerandheader', 'footer', '.content-footer', '.contributions__epic', '.submeta', '.content__section-label', '.content__meta-container', '.content__secondary-column', '.element', '.js-ad-slot', 'ad-slot']
    for (item in removeObjs) {
        if (document.querySelector(removeObjs[item])) {
            var removeObj = document.querySelector(removeObjs[item])
            removeObj.parentNode.removeChild(removeObj)
        }
    }
}
removeOption()
setInterval(removeOption, 2000)