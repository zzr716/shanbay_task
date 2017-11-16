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
    // 翻页导航
    var showContent = document.createElement('div')
    showContent.setAttribute('id', 'page_change')
    var contentMain = document.querySelector('.l-side-margins')
    contentMain.appendChild(showContent)
    showContent.style.position = 'fixed'
    showContent.style.bottom = 0
    showContent.style.textAlign = 'center'
    showContent.style.zIndex = '160'
    showContent.style.backgroundColor = 'white'
    showContent.style.width = '100%'
    showContent.style.margin = 0
    var pul = document.createElement('ul')
    pul.style.display = 'inline-block'
    pul.style.listStyleType = 'none'
    pul.style.whiteSpace = 'nowrap'
    pul.style.width = '9rem'
    pul.style.overflow = 'hidden'
    pul.style.margin = '0 auto'
    pul.style.textOverflow = 'ellipsis'
    var pre = document.createElement('a')
    pre.href = 'javascript: void(0)'
    pre.setAttribute('onclick', function() {
        if (window.pageYOffset != 0 || document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
            window.pageYOffset = window.pageYOffset - showHeight
            document.body.scrollTop = document.body.scrollTop - showHeight
            document.documentElement.scrollTop = document.documentElement.scrollTop - showHeight
        }
    })    
    pre.innerHTML = '上一页'
    var next = document.createElement('a')
    next.href = 'javascript: void(0)'
    next.addEventListener('click', function() {
        var acontent = document.querySelector('.content__main')
        var maxHeight = acontent.scrollHeight - showHeight
        if (window.pageYOffset <maxHeight || document.body.scrollTop <maxHeight || document.documentElement.scrollTop <maxHeight)
        window.pageYOffset = window.pageYOffset + showHeight
        document.body.scrollTop = document.body.scrollTop + showHeight
        document.documentElement.scrollTop = document.documentElement.scrollTop + showHeight
    })
    next.innerHTML = '下一页'
    showContent.appendChild(pre)
    showContent.appendChild(next)
    var acontent = document.querySelector('.content__main')
    var showHeight = window.innerHeight - showContent.clientHeight - 30
    var pno = Math.ceil(parseInt(acontent.scrollHeight)/parseInt(showHeight))
    console.log(pno)
    for (var i = 1; i <= pno; i++) {
        var pli = document.createElement('li')
        pli.style.display = 'inline'
        pli.style.whiteSpace = 'nowrap'
        pli.style.margin = '0 0.44rem'
        pli.innerHTML = `<a href="javascript:void(0)" onclick="\pagenation()">${i}</a>`
        pul.appendChild(pli)
        showContent.insertBefore(pul, showContent.lastChild)
    }
}
    
/**
 * 弹框
 * 查词
 */
function getWord() {
    var word = null
    if (window.getSelection) {
        word = window.getSelection()
    }
    else if (document.getSelection) {
        word = document.getSelection()
    }
    else if (document.selection) {
        word = document.selection.createRange().text
    }
    return word.toString().trim()
}
function ajax(url,fnSucc) {
    if(window.XMLHttpRequest) {
        var oAjax = new XMLHttpRequest()
    }
    else {
        var oAjax = new ActiveXObject("Microsoft.XMLHTTP") //IE6浏览器创建ajax对象
    }
    oAjax.open("GET",url,true) //把要读取的参数的传过来。
    oAjax.send()
    oAjax.onreadystatechange = function() {
        if (oAjax.readyState==4) {
            if (oAjax.status==200) {
                // console.log(200)
                fnSucc(JSON.parse(oAjax.responseText)) //成功的时候调用这个方法
            }
            else {
                fnSucc(oAjax.responseText)
            }
        }
    }
}

// 翻译弹框
function mousePosition(evt) {
    evt = evt || window.event
    var x = evt.pageX || evt.clientX || evt.offsetX || evt.x
    var y = evt.pageY || evt.clientY || evt.offsetY || evt.y
    return (x, y)
}
document.querySelector('.content__main').addEventListener("mouseup", function (e) {
    // console.log(getWord())
    var pop = document.querySelector('.shabay_popup')    
    var text = getWord()
    ajax(`https://api.shanbay.com/bdc/search/?word=${text}`, function (res) {
        console.log(res)
        if (res.status_code == 0) {
            console.log('意思'+res.data.definition)

            mousePosition(e)
            var pop = document.createElement('div')
            pop.setAttribute('class', 'shabay_popup')
            pop.style.cssText = 'opacity:0.8;background:#ccc;position:fixed;display:block;width:200px;z-index:999'
            // var pop = document.querySelector('.shabay_popup')
            var popY = pop.offsetHeight
            var popX = pop.offsetWidth
            const bodyH = window.pageYOffset > document.documentElement.clientHeight ?
                window.pageYOffset : document.documentElement.clientHeight;
            const bodyW = window.pageXOffset > document.documentElement.clientWidth ?
                window.pageXOffset : document.documentElement.clientWidth;
            if (e.y + popY >= bodyH) {
                pop.style.top = `${e.y - popY -10}px`
            } else {
                pop.style.top = `${e.y + 10}px`
            }
            if (e.x + popX >= bodyW && e.x < popX) {
                pop.style.left = `${e.x - popX / 2}px`
            } else if (e.x + popX >= bodyW) {
                pop.style.left = `${e.x - popX}px`
            } else {
                pop.style.left = `${e.x}px`
            }    
            // document.querySelector('.shabay_popup').innerHTML = `${res.data.definition}`
            pop.innerHTML = `
            <p style='width="100%"'>
            <audio id="audio1" autoplay> 
                <source = src="${res.data.audio_addresses.uk[0]}" type="audio/mp3">
            </audio>
            </p>
            <span>${res.data.definition}</span>`
            document.querySelector('.content__main').appendChild(pop)
            setInterval(()=>{
                pop.style.display = 'none'
            }, 2000)
        } else {
            console.log('查询出错，请重新查词')
            document.querySelector('.shabay_popup').innerHTML = '查询出错，请重试'
        }  
    })
})
goPage()