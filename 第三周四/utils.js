let utils = (function () {
    function offset(curEle) { // 当前元素
        let l = curEle.offsetLeft;
        let t = curEle.offsetTop;
        let parent = curEle.offsetParent;
        // 上来先获取一个偏移量和父级参照物

        while (parent !== document.body) {
            // 检测一下当前元素的父级参照物是否是body，如果不是就累加父级参照的左边框的宽度和父级参照物的偏移量
            l += parent.clientLeft + parent.offsetLeft;
            t += parent.clientTop + parent.offsetTop;
            // 在获取父级参照物的父级参照物，直到获取到body为止
            parent = parent.offsetParent;
        }
        return {
            left: l,
            top: t
        }
    }

    function getCss(curEle, attr) {
        let val = null;
        // 考虑兼容，在谷歌下使用getComputedStyle，在IE下使用currentStyle
        if ('getComputedStyle' in window) {
            val = getComputedStyle(curEle)[attr]
        } else {
            val = curEle.currentStyle[attr]
        }
        let reg = /^(width|height|padding|margin|left|right|top|bottom|fontSize|opacity)$/
        // 把获取的带单位的值的单位去掉，并且转数字
        if (reg.test(attr)) {
            val = parseFloat(val);
        }
        return val;
    }

    function setCss(curEle, attr, value) {

        let reg = /^(width|height|padding|margin|left|right|top|bottom|fontSize)$/
        // 先判断一下当前的属性名对应的值需不需要单位
        if (reg.test(attr)) {
            // 在判断你到底有没有给加单位，如果没有，就给加上
            if (typeof value === 'number') {
                value = value + 'px';
            }
        }
        curEle.style[attr] = value;
    }

    function setGroupCss(curEle, obj) {
        // 对象有几个键值对就调用几次setCss方法，
        for (var key in obj) {
            setCss(curEle, key, obj[key])
        }
    }
    function css(){
        let [curEle,attr,value] = arguments;
        // 如果传参的个数是2，那就说明不是获取样式就是批量设置样式
        if(arguments.length === 2){
            // 如果第二个参的数据类型是字符串，那就是获取样式
            if(typeof attr === 'string'){
                return getCss(curEle,attr)
            }
            else {
                setGroupCss(curEle,attr)
            }
        }
        // 如果传递的参数是3个，那就是单个设置样式
        else if(arguments.length === 3){
            setCss(curEle,attr,value)
        }

    }
    function win(attr,value){
        if(value === undefined){
          return  document.documentElement[attr] || document.body[attr]
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
   }
    return {
        offset,
        getCss,
        setCss,
        setGroupCss,
        css,
        win
    }
})()
