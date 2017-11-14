/**
 * 扇贝小作业
 * By zzr
 * 2017-11-04
 */
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
/**
 * 分页函数
 * 数据行全部加载，通过是否显示属性完成分页功能
 */
function goPage() {
    var acontent = document.querySelector('.content__article-body')
    acontent.style.display = 'none'
    // var pno = Math.ceil(parseInt(acontent.scrollHeight)/parseInt(acontent.offsetHeight))
    var content = acontent.innerHTML
    // 总行数
    var allLine = Math.ceil(parseInt(content.length)/parseInt(acontent.clientWidth))
        
    // 翻页栏
    var showContent = document.createElement('div')
    var contentMain = document.querySelector('.l-side-margins')
    contentMain.appendChild(showContent)
    contentMain.style.position = 'relative'
    showContent.style.position = 'absolute'
    showContent.style.bottom = 0
    showContent.innerHTML = '<a href="javascript:void(0)" onclick="DHTMLpagenation.previous()">上一页</a>'+'<a href="javascript:void(0)" onclick="DHTMLpagenation.next()">下一页</a>'
    
}